import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationToggleDialogComponent } from './confirmation-toggle-dialog.component';

describe('ConfirmationToggleDialogComponent', () => {
  let component: ConfirmationToggleDialogComponent;
  let fixture: ComponentFixture<ConfirmationToggleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationToggleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationToggleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
