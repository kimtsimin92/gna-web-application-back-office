import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLoadingDialogComponent } from './remove-loading-dialog.component';

describe('RemoveLoadingDialogComponent', () => {
  let component: RemoveLoadingDialogComponent;
  let fixture: ComponentFixture<RemoveLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveLoadingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
