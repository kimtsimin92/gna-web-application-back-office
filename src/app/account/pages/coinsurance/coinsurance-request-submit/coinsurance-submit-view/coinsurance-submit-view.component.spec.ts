import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsuranceSubmitViewComponent } from './coinsurance-submit-view.component';

describe('CoinsuranceSubmitViewComponent', () => {
  let component: CoinsuranceSubmitViewComponent;
  let fixture: ComponentFixture<CoinsuranceSubmitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsuranceSubmitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsuranceSubmitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
