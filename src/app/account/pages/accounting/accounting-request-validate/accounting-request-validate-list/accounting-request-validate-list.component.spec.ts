import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingRequestValidateListComponent } from './accounting-request-validate-list.component';

describe('AccountingRequestValidateListComponent', () => {
  let component: AccountingRequestValidateListComponent;
  let fixture: ComponentFixture<AccountingRequestValidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingRequestValidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingRequestValidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
