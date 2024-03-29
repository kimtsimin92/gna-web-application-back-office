import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationSelectComponent } from './simulation-select.component';

describe('SimulationSelectComponent', () => {
  let component: SimulationSelectComponent;
  let fixture: ComponentFixture<SimulationSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
