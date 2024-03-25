import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalculationListComponent } from './premium-calculation-list.component';

describe('PremiumCalculationListComponent', () => {
  let component: PremiumCalculationListComponent;
  let fixture: ComponentFixture<PremiumCalculationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCalculationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumCalculationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
