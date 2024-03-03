import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoadingDialogComponent } from './add-loading-dialog.component';

describe('AddLoadingDialogComponent', () => {
  let component: AddLoadingDialogComponent;
  let fixture: ComponentFixture<AddLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLoadingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
