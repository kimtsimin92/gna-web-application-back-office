import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoadingDialogComponent } from './edit-loading-dialog.component';

describe('EditLoadingDialogComponent', () => {
  let component: EditLoadingDialogComponent;
  let fixture: ComponentFixture<EditLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoadingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
