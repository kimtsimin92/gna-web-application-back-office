import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalculationAddComponent } from './premium-calculation-add.component';

describe('PremiumCalculationAddComponent', () => {
  let component: PremiumCalculationAddComponent;
  let fixture: ComponentFixture<PremiumCalculationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCalculationAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumCalculationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
