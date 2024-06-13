import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSubmitViewComponent } from './subscription-submit-view.component';

describe('SubscriptionSubmitViewComponent', () => {
  let component: SubscriptionSubmitViewComponent;
  let fixture: ComponentFixture<SubscriptionSubmitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionSubmitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionSubmitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
