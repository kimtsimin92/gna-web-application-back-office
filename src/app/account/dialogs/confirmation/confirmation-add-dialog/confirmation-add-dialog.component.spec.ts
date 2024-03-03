import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAddDialogComponent } from './confirmation-add-dialog.component';

describe('ConfirmationAddDialogComponent', () => {
  let component: ConfirmationAddDialogComponent;
  let fixture: ComponentFixture<ConfirmationAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationAddDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
