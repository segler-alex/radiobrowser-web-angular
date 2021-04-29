import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeclistComponent } from './codeclist.component';

describe('CodeclistComponent', () => {
  let component: CodeclistComponent;
  let fixture: ComponentFixture<CodeclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeclistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
