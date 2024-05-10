import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalAccountRequestListComponent } from './customer-personal-account-request-list.component';

describe('CustomerPersonalAccountRequestListComponent', () => {
  let component: CustomerPersonalAccountRequestListComponent;
  let fixture: ComponentFixture<CustomerPersonalAccountRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPersonalAccountRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPersonalAccountRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
