import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubscriptionListComponent } from './form-subscription-list.component';

describe('FormSubscriptionListComponent', () => {
  let component: FormSubscriptionListComponent;
  let fixture: ComponentFixture<FormSubscriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubscriptionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSubscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
