import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrylistComponent } from './countrylist.component';

describe('CountrylistComponent', () => {
  let component: CountrylistComponent;
  let fixture: ComponentFixture<CountrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
