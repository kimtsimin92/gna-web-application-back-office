import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgotEmailComponent } from './password-forgot-email.component';

describe('PasswordForgotEmailComponent', () => {
  let component: PasswordForgotEmailComponent;
  let fixture: ComponentFixture<PasswordForgotEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordForgotEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordForgotEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
