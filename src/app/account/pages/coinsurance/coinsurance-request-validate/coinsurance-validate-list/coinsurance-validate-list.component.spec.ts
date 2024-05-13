import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsuranceValidateListComponent } from './coinsurance-validate-list.component';

describe('CoinsuranceValidateListComponent', () => {
  let component: CoinsuranceValidateListComponent;
  let fixture: ComponentFixture<CoinsuranceValidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsuranceValidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsuranceValidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
