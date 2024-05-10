import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalAccountRequestDetailComponent } from './customer-personal-account-request-detail.component';

describe('CustomerPersonalAccountRequestDetailComponent', () => {
  let component: CustomerPersonalAccountRequestDetailComponent;
  let fixture: ComponentFixture<CustomerPersonalAccountRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPersonalAccountRequestDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPersonalAccountRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
