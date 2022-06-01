import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBandPostComponent } from './create-band-post.component';

describe('CreateBandPostComponent', () => {
  let component: CreateBandPostComponent;
  let fixture: ComponentFixture<CreateBandPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBandPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBandPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
