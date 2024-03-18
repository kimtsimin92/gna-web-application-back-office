import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputNumberDialogComponent } from './form-builder-input-number-dialog.component';

describe('FormBuilderInputNumberDialogComponent', () => {
  let component: FormBuilderInputNumberDialogComponent;
  let fixture: ComponentFixture<FormBuilderInputNumberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderInputNumberDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderInputNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
