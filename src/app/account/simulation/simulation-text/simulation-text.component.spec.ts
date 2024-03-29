import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationTextComponent } from './simulation-text.component';

describe('SimulationTextComponent', () => {
  let component: SimulationTextComponent;
  let fixture: ComponentFixture<SimulationTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
