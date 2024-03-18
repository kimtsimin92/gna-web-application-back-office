import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputEmailDialogComponent } from './form-builder-input-email-dialog.component';

describe('FormBuilderInputEmailDialogComponent', () => {
  let component: FormBuilderInputEmailDialogComponent;
  let fixture: ComponentFixture<FormBuilderInputEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderInputEmailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderInputEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
