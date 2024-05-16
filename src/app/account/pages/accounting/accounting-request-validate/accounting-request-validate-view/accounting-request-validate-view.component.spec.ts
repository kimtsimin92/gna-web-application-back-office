import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingRequestValidateViewComponent } from './accounting-request-validate-view.component';

describe('AccountingRequestValidateViewComponent', () => {
  let component: AccountingRequestValidateViewComponent;
  let fixture: ComponentFixture<AccountingRequestValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingRequestValidateViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingRequestValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
