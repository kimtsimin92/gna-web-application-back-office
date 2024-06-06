import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionQuoteListComponent } from './subscription-quote-list.component';

describe('SubscriptionQuoteListComponent', () => {
  let component: SubscriptionQuoteListComponent;
  let fixture: ComponentFixture<SubscriptionQuoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionQuoteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionQuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
