import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentAddComponent } from './segment-add.component';

describe('SegmentAddComponent', () => {
  let component: SegmentAddComponent;
  let fixture: ComponentFixture<SegmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
