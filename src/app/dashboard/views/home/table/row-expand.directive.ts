import { Directive , HostBinding, HostListener, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[tableRowExpand]'
})
export class RowExpandDirective {
  private row: any;
  private templateRef: TemplateRef<any>;
  private opened: boolean;

  @HostBinding('class.expanded')
  get expanded(): boolean {
    return this.opened
  }

  @Input('tableRowExpand')
  set tableDetailRow(value: any) {
    if (value !== this.row) {
      this.row = value;
    }
  }

  @Input('tableDetailRowTpl')
  set template(value: TemplateRef<any>) {
    if (value !== this.templateRef) {
      this.templateRef = value
    }
  }

  constructor(public vcRef: ViewContainerRef) { }

  @HostListener('click')
  onclick(): void {
    this.toggle();
  }

  toggle(): void {
    if (this.opened) {
      this.vcRef.clear()
    } else {
      this.render()
    }
    this.opened = this.vcRef.length > 0;
  }

  private render(): void {
    this.vcRef.clear();
    if (this.templateRef && this.row) {
      this.vcRef.createEmbeddedView(this.templateRef, {$implicit: this.row})
    }
  }

}
