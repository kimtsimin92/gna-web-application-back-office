import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPasswordForgotEmailErrorDialogComponent } from './auth-password-forgot-email-error-dialog.component';

describe('AuthPasswordForgotEmailErrorDialogComponent', () => {
  let component: AuthPasswordForgotEmailErrorDialogComponent;
  let fixture: ComponentFixture<AuthPasswordForgotEmailErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPasswordForgotEmailErrorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthPasswordForgotEmailErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
