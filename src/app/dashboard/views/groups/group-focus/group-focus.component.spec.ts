import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFocusComponent } from './group-focus.component';

describe('GroupFocusComponent', () => {
  let component: GroupFocusComponent;
  let fixture: ComponentFixture<GroupFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
