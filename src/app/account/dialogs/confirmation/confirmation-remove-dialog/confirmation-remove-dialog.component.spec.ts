import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationRemoveDialogComponent } from './confirmation-remove-dialog.component';

describe('ConfirmationRemoveDialogComponent', () => {
  let component: ConfirmationRemoveDialogComponent;
  let fixture: ComponentFixture<ConfirmationRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationRemoveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
