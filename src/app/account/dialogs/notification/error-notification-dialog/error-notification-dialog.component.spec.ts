import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotificationDialogComponent } from './error-notification-dialog.component';

describe('ErrorNotificationDialogComponent', () => {
  let component: ErrorNotificationDialogComponent;
  let fixture: ComponentFixture<ErrorNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorNotificationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
