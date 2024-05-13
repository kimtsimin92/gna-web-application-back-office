import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinsuranceRejectViewComponent } from './reinsurance-reject-view.component';

describe('ReinsuranceRejectViewComponent', () => {
  let component: ReinsuranceRejectViewComponent;
  let fixture: ComponentFixture<ReinsuranceRejectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinsuranceRejectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReinsuranceRejectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
