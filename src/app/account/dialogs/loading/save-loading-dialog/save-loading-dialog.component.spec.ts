import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLoadingDialogComponent } from './save-loading-dialog.component';

describe('SaveLoadingDialogComponent', () => {
  let component: SaveLoadingDialogComponent;
  let fixture: ComponentFixture<SaveLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveLoadingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
