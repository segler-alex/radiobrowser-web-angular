import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastchangeComponent } from './lastchange.component';

describe('LastchangeComponent', () => {
  let component: LastchangeComponent;
  let fixture: ComponentFixture<LastchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
