import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionQuoteViewComponent } from './subscription-quote-view.component';

describe('SubscriptionQuoteViewComponent', () => {
  let component: SubscriptionQuoteViewComponent;
  let fixture: ComponentFixture<SubscriptionQuoteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionQuoteViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionQuoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
