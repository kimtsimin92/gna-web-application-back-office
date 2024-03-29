import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationTelComponent } from './simulation-tel.component';

describe('SimulationTelComponent', () => {
  let component: SimulationTelComponent;
  let fixture: ComponentFixture<SimulationTelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationTelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
