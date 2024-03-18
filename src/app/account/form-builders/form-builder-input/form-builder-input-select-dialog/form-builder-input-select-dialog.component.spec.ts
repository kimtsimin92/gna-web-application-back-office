import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputSelectDialogComponent } from './form-builder-input-select-dialog.component';

describe('FormBuilderInputSelectDialogComponent', () => {
  let component: FormBuilderInputSelectDialogComponent;
  let fixture: ComponentFixture<FormBuilderInputSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderInputSelectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderInputSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
