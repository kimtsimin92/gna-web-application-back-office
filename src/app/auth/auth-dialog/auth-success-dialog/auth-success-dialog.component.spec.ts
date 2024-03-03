import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessDialogComponent } from './auth-success-dialog.component';

describe('AuthSuccessDialogComponent', () => {
  let component: AuthSuccessDialogComponent;
  let fixture: ComponentFixture<AuthSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSuccessDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
