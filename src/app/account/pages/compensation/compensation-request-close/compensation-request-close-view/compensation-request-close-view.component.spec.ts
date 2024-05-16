import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationRequestCloseViewComponent } from './compensation-request-close-view.component';

describe('CompensationRequestCloseViewComponent', () => {
  let component: CompensationRequestCloseViewComponent;
  let fixture: ComponentFixture<CompensationRequestCloseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompensationRequestCloseViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompensationRequestCloseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
