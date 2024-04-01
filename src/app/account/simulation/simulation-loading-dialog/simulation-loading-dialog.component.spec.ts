import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationLoadingDialogComponent } from './simulation-loading-dialog.component';

describe('SimulationLoadingDialogComponent', () => {
  let component: SimulationLoadingDialogComponent;
  let fixture: ComponentFixture<SimulationLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationLoadingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
