import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationQuotationLoadingDialogComponent } from './simulation-quotation-loading-dialog.component';

describe('SimulationQuotationLoadingDialogComponent', () => {
  let component: SimulationQuotationLoadingDialogComponent;
  let fixture: ComponentFixture<SimulationQuotationLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationQuotationLoadingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationQuotationLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
