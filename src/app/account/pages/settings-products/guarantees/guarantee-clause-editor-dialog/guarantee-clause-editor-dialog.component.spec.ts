import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeClauseEditorDialogComponent } from './guarantee-clause-editor-dialog.component';

describe('GuaranteeClauseEditorDialogComponent', () => {
  let component: GuaranteeClauseEditorDialogComponent;
  let fixture: ComponentFixture<GuaranteeClauseEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuaranteeClauseEditorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuaranteeClauseEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
