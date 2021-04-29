import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopclickComponent } from './topclick.component';

describe('TopclickComponent', () => {
  let component: TopclickComponent;
  let fixture: ComponentFixture<TopclickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopclickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
