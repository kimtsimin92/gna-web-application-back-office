import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionValidateViewComponent } from './subscription-validate-view.component';

describe('SubscriptionValidateViewComponent', () => {
  let component: SubscriptionValidateViewComponent;
  let fixture: ComponentFixture<SubscriptionValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionValidateViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
