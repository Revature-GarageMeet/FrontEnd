import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttypeComponent } from './posttype.component';

describe('PosttypeComponent', () => {
  let component: PosttypeComponent;
  let fixture: ComponentFixture<PosttypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosttypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
