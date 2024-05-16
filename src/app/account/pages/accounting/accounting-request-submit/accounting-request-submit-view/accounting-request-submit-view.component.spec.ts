import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingRequestSubmitViewComponent } from './accounting-request-submit-view.component';

describe('AccountingRequestSubmitViewComponent', () => {
  let component: AccountingRequestSubmitViewComponent;
  let fixture: ComponentFixture<AccountingRequestSubmitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingRequestSubmitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingRequestSubmitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
