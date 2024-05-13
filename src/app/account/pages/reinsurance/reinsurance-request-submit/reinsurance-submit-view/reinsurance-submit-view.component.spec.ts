import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinsuranceSubmitViewComponent } from './reinsurance-submit-view.component';

describe('ReinsuranceSubmitViewComponent', () => {
  let component: ReinsuranceSubmitViewComponent;
  let fixture: ComponentFixture<ReinsuranceSubmitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinsuranceSubmitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReinsuranceSubmitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
