import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsuranceValidateViewComponent } from './coinsurance-validate-view.component';

describe('CoinsuranceValidateViewComponent', () => {
  let component: CoinsuranceValidateViewComponent;
  let fixture: ComponentFixture<CoinsuranceValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsuranceValidateViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsuranceValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
