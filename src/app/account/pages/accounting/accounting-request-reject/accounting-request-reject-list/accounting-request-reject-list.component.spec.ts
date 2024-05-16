import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingRequestRejectListComponent } from './accounting-request-reject-list.component';

describe('AccountingRequestRejectListComponent', () => {
  let component: AccountingRequestRejectListComponent;
  let fixture: ComponentFixture<AccountingRequestRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingRequestRejectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingRequestRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
