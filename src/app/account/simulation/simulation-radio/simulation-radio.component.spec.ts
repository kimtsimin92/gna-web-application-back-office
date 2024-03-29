import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationRadioComponent } from './simulation-radio.component';

describe('SimulationRadioComponent', () => {
  let component: SimulationRadioComponent;
  let fixture: ComponentFixture<SimulationRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
