import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentViewComponent } from './segment-view.component';

describe('SegmentViewComponent', () => {
  let component: SegmentViewComponent;
  let fixture: ComponentFixture<SegmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
