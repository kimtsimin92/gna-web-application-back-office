import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinsuranceValidateViewComponent } from './reinsurance-validate-view.component';

describe('ReinsuranceValidateViewComponent', () => {
  let component: ReinsuranceValidateViewComponent;
  let fixture: ComponentFixture<ReinsuranceValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinsuranceValidateViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReinsuranceValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
