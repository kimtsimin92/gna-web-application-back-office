import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationTextareaComponent } from './simulation-textarea.component';

describe('SimulationTextareaComponent', () => {
  let component: SimulationTextareaComponent;
  let fixture: ComponentFixture<SimulationTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationTextareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
