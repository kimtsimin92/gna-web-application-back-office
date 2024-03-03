import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveNotificationDialogComponent } from './save-notification-dialog.component';

describe('SaveNotificationDialogComponent', () => {
  let component: SaveNotificationDialogComponent;
  let fixture: ComponentFixture<SaveNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveNotificationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
