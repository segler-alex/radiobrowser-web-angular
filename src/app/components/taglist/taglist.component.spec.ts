import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaglistComponent } from './taglist.component';

describe('TaglistComponent', () => {
  let component: TaglistComponent;
  let fixture: ComponentFixture<TaglistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
