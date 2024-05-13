import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsuranceSubmitListComponent } from './coinsurance-submit-list.component';

describe('CoinsuranceSubmitListComponent', () => {
  let component: CoinsuranceSubmitListComponent;
  let fixture: ComponentFixture<CoinsuranceSubmitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsuranceSubmitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsuranceSubmitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
