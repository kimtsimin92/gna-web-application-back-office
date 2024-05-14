import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomerAccountPersonalListComponent } from './management-customer-account-personal-list.component';

describe('ManagementCustomerAccountPersonalListComponent', () => {
  let component: ManagementCustomerAccountPersonalListComponent;
  let fixture: ComponentFixture<ManagementCustomerAccountPersonalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementCustomerAccountPersonalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementCustomerAccountPersonalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
