import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationCheckboxComponent } from './simulation-checkbox.component';

describe('SimulationCheckboxComponent', () => {
  let component: SimulationCheckboxComponent;
  let fixture: ComponentFixture<SimulationCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
