import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarbindTableComponent } from './varbind-table.component';

describe('VarbindTableComponent', () => {
  let component: VarbindTableComponent;
  let fixture: ComponentFixture<VarbindTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarbindTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarbindTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
