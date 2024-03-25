import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalculationEditComponent } from './premium-calculation-edit.component';

describe('PremiumCalculationEditComponent', () => {
  let component: PremiumCalculationEditComponent;
  let fixture: ComponentFixture<PremiumCalculationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCalculationEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumCalculationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
