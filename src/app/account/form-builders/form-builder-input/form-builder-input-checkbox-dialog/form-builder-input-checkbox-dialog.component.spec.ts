import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputCheckboxDialogComponent } from './form-builder-input-checkbox-dialog.component';

describe('FormBuilderInputCheckboxDialogComponent', () => {
  let component: FormBuilderInputCheckboxDialogComponent;
  let fixture: ComponentFixture<FormBuilderInputCheckboxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderInputCheckboxDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderInputCheckboxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
