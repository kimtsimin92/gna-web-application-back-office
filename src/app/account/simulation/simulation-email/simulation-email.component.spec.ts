import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationEmailComponent } from './simulation-email.component';

describe('SimulationEmailComponent', () => {
  let component: SimulationEmailComponent;
  let fixture: ComponentFixture<SimulationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
