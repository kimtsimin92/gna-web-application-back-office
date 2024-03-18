import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputRadioDialogComponent } from './form-builder-input-radio-dialog.component';

describe('FormBuilderInputRadioDialogComponent', () => {
  let component: FormBuilderInputRadioDialogComponent;
  let fixture: ComponentFixture<FormBuilderInputRadioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderInputRadioDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderInputRadioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
