import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalculationModalityDialogComponent } from './premium-calculation-modality-dialog.component';

describe('PremiumCalculationModalityDialogComponent', () => {
  let component: PremiumCalculationModalityDialogComponent;
  let fixture: ComponentFixture<PremiumCalculationModalityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCalculationModalityDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumCalculationModalityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
