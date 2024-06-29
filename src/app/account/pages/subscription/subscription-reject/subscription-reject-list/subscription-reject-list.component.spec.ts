import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionRejectListComponent } from './subscription-reject-list.component';

describe('SubscriptionRejectListComponent', () => {
  let component: SubscriptionRejectListComponent;
  let fixture: ComponentFixture<SubscriptionRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionRejectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
