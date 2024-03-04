import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationToggleEnableDialogComponent } from './confirmation-toggle-enable-dialog.component';

describe('ConfirmationToggleEnableDialogComponent', () => {
  let component: ConfirmationToggleEnableDialogComponent;
  let fixture: ComponentFixture<ConfirmationToggleEnableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationToggleEnableDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationToggleEnableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
