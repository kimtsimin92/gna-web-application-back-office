import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalculationDetailComponent } from './premium-calculation-detail.component';

describe('PremiumCalculationDetailComponent', () => {
  let component: PremiumCalculationDetailComponent;
  let fixture: ComponentFixture<PremiumCalculationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCalculationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumCalculationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
