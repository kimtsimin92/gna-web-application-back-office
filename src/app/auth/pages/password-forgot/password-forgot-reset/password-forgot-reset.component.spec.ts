import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgotResetComponent } from './password-forgot-reset.component';

describe('PasswordForgotResetComponent', () => {
  let component: PasswordForgotResetComponent;
  let fixture: ComponentFixture<PasswordForgotResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordForgotResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordForgotResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
