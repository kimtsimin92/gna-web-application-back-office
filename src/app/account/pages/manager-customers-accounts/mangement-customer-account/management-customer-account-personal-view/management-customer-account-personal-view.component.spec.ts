import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomerAccountPersonalViewComponent } from './management-customer-account-personal-view.component';

describe('ManagementCustomerAccountPersonalViewComponent', () => {
  let component: ManagementCustomerAccountPersonalViewComponent;
  let fixture: ComponentFixture<ManagementCustomerAccountPersonalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementCustomerAccountPersonalViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementCustomerAccountPersonalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
