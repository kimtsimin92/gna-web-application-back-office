import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsCloseViewComponent } from './complaints-close-view.component';

describe('ComplaintsCloseViewComponent', () => {
  let component: ComplaintsCloseViewComponent;
  let fixture: ComponentFixture<ComplaintsCloseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsCloseViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplaintsCloseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
