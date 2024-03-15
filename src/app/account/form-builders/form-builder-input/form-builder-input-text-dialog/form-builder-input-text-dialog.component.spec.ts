import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputTextDialogComponent } from './form-builder-input-text-dialog.component';

describe('FormBuilderInputTextDialogComponent', () => {
  let component: FormBuilderInputTextDialogComponent;
  let fixture: ComponentFixture<FormBuilderInputTextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderInputTextDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderInputTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
