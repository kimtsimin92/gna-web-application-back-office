import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputDateDialogComponent } from './form-builder-input-date-dialog.component';

describe('FormBuilderInputDateDialogComponent', () => {
  let component: FormBuilderInputDateDialogComponent;
  let fixture: ComponentFixture<FormBuilderInputDateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderInputDateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderInputDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
