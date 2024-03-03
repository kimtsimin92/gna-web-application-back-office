import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAlertDialogComponent } from './session-alert-dialog.component';

describe('SessionAlertDialogComponent', () => {
  let component: SessionAlertDialogComponent;
  let fixture: ComponentFixture<SessionAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionAlertDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
