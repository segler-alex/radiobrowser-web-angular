import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StationlistComponent } from './stationlist.component';

describe('StationlistComponent', () => {
  let component: StationlistComponent;
  let fixture: ComponentFixture<StationlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
