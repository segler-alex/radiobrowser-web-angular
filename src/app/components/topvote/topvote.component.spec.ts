import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopvoteComponent } from './topvote.component';

describe('TopvoteComponent', () => {
  let component: TopvoteComponent;
  let fixture: ComponentFixture<TopvoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopvoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopvoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
