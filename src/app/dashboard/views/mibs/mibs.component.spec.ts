import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MibsComponent } from './mibs.component';

describe('MibsComponent', () => {
  let component: MibsComponent;
  let fixture: ComponentFixture<MibsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MibsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MibsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
