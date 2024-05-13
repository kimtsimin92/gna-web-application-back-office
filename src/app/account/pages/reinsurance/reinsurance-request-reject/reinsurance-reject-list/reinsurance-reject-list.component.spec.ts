import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinsuranceRejectListComponent } from './reinsurance-reject-list.component';

describe('ReinsuranceRejectListComponent', () => {
  let component: ReinsuranceRejectListComponent;
  let fixture: ComponentFixture<ReinsuranceRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinsuranceRejectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReinsuranceRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
