import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyAccountRequestDetailComponent } from './customer-company-account-request-detail.component';

describe('CustomerCompanyAccountRequestDetailComponent', () => {
  let component: CustomerCompanyAccountRequestDetailComponent;
  let fixture: ComponentFixture<CustomerCompanyAccountRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCompanyAccountRequestDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCompanyAccountRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
