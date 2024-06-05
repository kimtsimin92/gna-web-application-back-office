import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSimulationComponent } from './quote-simulation.component';

describe('QuoteSimulationComponent', () => {
  let component: QuoteSimulationComponent;
  let fixture: ComponentFixture<QuoteSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteSimulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
