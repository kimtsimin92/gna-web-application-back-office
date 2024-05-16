import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingRequestRejectViewComponent } from './accounting-request-reject-view.component';

describe('AccountingRequestRejectViewComponent', () => {
  let component: AccountingRequestRejectViewComponent;
  let fixture: ComponentFixture<AccountingRequestRejectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingRequestRejectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingRequestRejectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
