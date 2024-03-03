import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveErrorNotificationDialogComponent } from './save-error-notification-dialog.component';

describe('SaveErrorNotificationDialogComponent', () => {
  let component: SaveErrorNotificationDialogComponent;
  let fixture: ComponentFixture<SaveErrorNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveErrorNotificationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveErrorNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
