import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirstTimeLoadingDialogComponent } from './login-first-time-loading-dialog.component';

describe('LoginFirstTimeLoadingDialogComponent', () => {
  let component: LoginFirstTimeLoadingDialogComponent;
  let fixture: ComponentFixture<LoginFirstTimeLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFirstTimeLoadingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFirstTimeLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
