import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotBlankDialogComponent } from './not-blank-dialog.component';

describe('NotBlankDialogComponent', () => {
  let component: NotBlankDialogComponent;
  let fixture: ComponentFixture<NotBlankDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotBlankDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotBlankDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
