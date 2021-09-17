import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedComponent } from './verified.component';

describe('VerifiedComponent', () => {
  let component: VerifiedComponent;
  let fixture: ComponentFixture<VerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
