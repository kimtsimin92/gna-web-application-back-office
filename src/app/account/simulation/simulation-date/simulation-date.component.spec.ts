import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationDateComponent } from './simulation-date.component';

describe('SimulationDateComponent', () => {
  let component: SimulationDateComponent;
  let fixture: ComponentFixture<SimulationDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
