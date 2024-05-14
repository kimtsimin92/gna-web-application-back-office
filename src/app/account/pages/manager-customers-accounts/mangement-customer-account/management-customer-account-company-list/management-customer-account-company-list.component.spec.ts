import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomerAccountCompanyListComponent } from './management-customer-account-company-list.component';

describe('ManagementCustomerAccountCompanyListComponent', () => {
  let component: ManagementCustomerAccountCompanyListComponent;
  let fixture: ComponentFixture<ManagementCustomerAccountCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementCustomerAccountCompanyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementCustomerAccountCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
