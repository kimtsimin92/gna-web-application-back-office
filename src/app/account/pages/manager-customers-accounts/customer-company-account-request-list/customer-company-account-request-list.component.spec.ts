import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyAccountRequestListComponent } from './customer-company-account-request-list.component';

describe('CustomerCompanyAccountRequestListComponent', () => {
  let component: CustomerCompanyAccountRequestListComponent;
  let fixture: ComponentFixture<CustomerCompanyAccountRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCompanyAccountRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCompanyAccountRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
