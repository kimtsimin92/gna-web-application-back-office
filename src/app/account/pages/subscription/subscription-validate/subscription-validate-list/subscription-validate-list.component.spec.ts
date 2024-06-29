import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionValidateListComponent } from './subscription-validate-list.component';

describe('SubscriptionValidateListComponent', () => {
  let component: SubscriptionValidateListComponent;
  let fixture: ComponentFixture<SubscriptionValidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionValidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionValidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
