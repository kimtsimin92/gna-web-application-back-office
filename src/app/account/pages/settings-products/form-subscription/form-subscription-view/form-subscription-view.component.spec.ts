import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubscriptionViewComponent } from './form-subscription-view.component';

describe('FormSubscriptionViewComponent', () => {
  let component: FormSubscriptionViewComponent;
  let fixture: ComponentFixture<FormSubscriptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubscriptionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSubscriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
