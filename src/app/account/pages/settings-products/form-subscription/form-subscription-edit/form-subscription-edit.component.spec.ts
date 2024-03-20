import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubscriptionEditComponent } from './form-subscription-edit.component';

describe('FormSubscriptionEditComponent', () => {
  let component: FormSubscriptionEditComponent;
  let fixture: ComponentFixture<FormSubscriptionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubscriptionEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSubscriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
