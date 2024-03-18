import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputTextareaDialogComponent } from './form-builder-input-textarea-dialog.component';

describe('FormBuilderInputTextareaDialogComponent', () => {
  let component: FormBuilderInputTextareaDialogComponent;
  let fixture: ComponentFixture<FormBuilderInputTextareaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderInputTextareaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderInputTextareaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
