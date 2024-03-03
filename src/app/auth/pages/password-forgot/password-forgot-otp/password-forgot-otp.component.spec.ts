import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgotOtpComponent } from './password-forgot-otp.component';

describe('PasswordForgotOtpComponent', () => {
  let component: PasswordForgotOtpComponent;
  let fixture: ComponentFixture<PasswordForgotOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordForgotOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordForgotOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
