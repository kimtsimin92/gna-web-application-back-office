import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinsuranceSubmitListComponent } from './reinsurance-submit-list.component';

describe('ReinsuranceSubmitListComponent', () => {
  let component: ReinsuranceSubmitListComponent;
  let fixture: ComponentFixture<ReinsuranceSubmitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinsuranceSubmitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReinsuranceSubmitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
