import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPasswordForgotEmailDialogComponent } from './auth-password-forgot-email-dialog.component';

describe('AuthPasswordForgotEmailDialogComponent', () => {
  let component: AuthPasswordForgotEmailDialogComponent;
  let fixture: ComponentFixture<AuthPasswordForgotEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPasswordForgotEmailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthPasswordForgotEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
