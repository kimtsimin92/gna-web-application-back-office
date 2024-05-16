import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingRequestSubmitListComponent } from './accounting-request-submit-list.component';

describe('AccountingRequestSubmitListComponent', () => {
  let component: AccountingRequestSubmitListComponent;
  let fixture: ComponentFixture<AccountingRequestSubmitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingRequestSubmitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingRequestSubmitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
