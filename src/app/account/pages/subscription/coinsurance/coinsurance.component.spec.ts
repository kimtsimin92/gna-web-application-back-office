import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsuranceComponent } from './coinsurance.component';

describe('CoinsuranceComponent', () => {
  let component: CoinsuranceComponent;
  let fixture: ComponentFixture<CoinsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsuranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
