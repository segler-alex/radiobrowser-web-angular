import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastclickComponent } from './lastclick.component';

describe('LastclickComponent', () => {
  let component: LastclickComponent;
  let fixture: ComponentFixture<LastclickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastclickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
