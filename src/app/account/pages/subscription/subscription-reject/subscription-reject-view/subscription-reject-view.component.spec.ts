import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionRejectViewComponent } from './subscription-reject-view.component';

describe('SubscriptionRejectViewComponent', () => {
  let component: SubscriptionRejectViewComponent;
  let fixture: ComponentFixture<SubscriptionRejectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionRejectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionRejectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
