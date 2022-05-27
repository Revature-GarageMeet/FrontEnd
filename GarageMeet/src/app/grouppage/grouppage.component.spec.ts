import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouppageComponent } from './grouppage.component';

describe('GrouppageComponent', () => {
  let component: GrouppageComponent;
  let fixture: ComponentFixture<GrouppageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrouppageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
