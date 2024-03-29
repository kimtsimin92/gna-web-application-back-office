import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationQuotationComponent } from './simulation-quotation.component';

describe('SimulationQuotationComponent', () => {
  let component: SimulationQuotationComponent;
  let fixture: ComponentFixture<SimulationQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationQuotationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
