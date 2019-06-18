import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarbindsComponent } from './varbinds.component';

describe('VarbindsComponent', () => {
  let component: VarbindsComponent;
  let fixture: ComponentFixture<VarbindsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarbindsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarbindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
