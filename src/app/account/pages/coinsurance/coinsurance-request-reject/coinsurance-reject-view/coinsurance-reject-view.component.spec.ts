import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsuranceRejectViewComponent } from './coinsurance-reject-view.component';

describe('CoinsuranceRejectViewComponent', () => {
  let component: CoinsuranceRejectViewComponent;
  let fixture: ComponentFixture<CoinsuranceRejectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsuranceRejectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsuranceRejectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
