import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationNumberComponent } from './simulation-number.component';

describe('SimulationNumberComponent', () => {
  let component: SimulationNumberComponent;
  let fixture: ComponentFixture<SimulationNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
