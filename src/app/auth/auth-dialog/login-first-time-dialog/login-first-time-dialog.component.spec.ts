import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirstTimeDialogComponent } from './login-first-time-dialog.component';

describe('LoginFirstTimeDialogComponent', () => {
  let component: LoginFirstTimeDialogComponent;
  let fixture: ComponentFixture<LoginFirstTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFirstTimeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFirstTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
