import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstationComponent } from './newstation.component';

describe('NewstationComponent', () => {
  let component: NewstationComponent;
  let fixture: ComponentFixture<NewstationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewstationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
