import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinsuranceValidateListComponent } from './reinsurance-validate-list.component';

describe('ReinsuranceValidateListComponent', () => {
  let component: ReinsuranceValidateListComponent;
  let fixture: ComponentFixture<ReinsuranceValidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinsuranceValidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReinsuranceValidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
