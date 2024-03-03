import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLogoutDialogComponent } from './auth-logout-dialog.component';

describe('AuthLogoutDialogComponent', () => {
  let component: AuthLogoutDialogComponent;
  let fixture: ComponentFixture<AuthLogoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLogoutDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthLogoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
