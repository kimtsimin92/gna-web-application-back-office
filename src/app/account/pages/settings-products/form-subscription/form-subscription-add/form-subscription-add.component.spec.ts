import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubscriptionAddComponent } from './form-subscription-add.component';

describe('FormSubscriptionAddComponent', () => {
  let component: FormSubscriptionAddComponent;
  let fixture: ComponentFixture<FormSubscriptionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubscriptionAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSubscriptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
