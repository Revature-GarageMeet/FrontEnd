import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandHomePageComponent } from './band-home-page.component';

describe('BandHomePageComponent', () => {
  let component: BandHomePageComponent;
  let fixture: ComponentFixture<BandHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
