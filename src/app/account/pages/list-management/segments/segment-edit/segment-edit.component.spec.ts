import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentEditComponent } from './segment-edit.component';

describe('SegmentEditComponent', () => {
  let component: SegmentEditComponent;
  let fixture: ComponentFixture<SegmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
