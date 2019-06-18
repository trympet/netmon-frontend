import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MibTableComponent } from './mib-table.component';

describe('MibTableComponent', () => {
  let component: MibTableComponent;
  let fixture: ComponentFixture<MibTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MibTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MibTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
