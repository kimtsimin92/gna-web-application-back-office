import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsuranceRejectListComponent } from './coinsurance-reject-list.component';

describe('CoinsuranceRejectListComponent', () => {
  let component: CoinsuranceRejectListComponent;
  let fixture: ComponentFixture<CoinsuranceRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsuranceRejectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsuranceRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
