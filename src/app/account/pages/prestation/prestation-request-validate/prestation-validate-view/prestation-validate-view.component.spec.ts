import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationValidateViewComponent } from './prestation-validate-view.component';

describe('PrestationValidateViewComponent', () => {
  let component: PrestationValidateViewComponent;
  let fixture: ComponentFixture<PrestationValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationValidateViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
