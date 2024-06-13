import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSubmitListComponent } from './subscription-submit-list.component';

describe('SubscriptionSubmitListComponent', () => {
  let component: SubscriptionSubmitListComponent;
  let fixture: ComponentFixture<SubscriptionSubmitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionSubmitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionSubmitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
