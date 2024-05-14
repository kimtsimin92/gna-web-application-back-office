import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomerAccountCompanyViewComponent } from './management-customer-account-company-view.component';

describe('ManagementCustomerAccountCompanyViewComponent', () => {
  let component: ManagementCustomerAccountCompanyViewComponent;
  let fixture: ComponentFixture<ManagementCustomerAccountCompanyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementCustomerAccountCompanyViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementCustomerAccountCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
