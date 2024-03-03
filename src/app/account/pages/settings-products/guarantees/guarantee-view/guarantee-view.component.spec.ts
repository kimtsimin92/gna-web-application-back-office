import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeViewComponent } from './guarantee-view.component';

describe('GuaranteeViewComponent', () => {
  let component: GuaranteeViewComponent;
  let fixture: ComponentFixture<GuaranteeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuaranteeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuaranteeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
