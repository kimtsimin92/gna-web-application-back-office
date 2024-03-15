import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuotationViewComponent } from './form-quotation-view.component';

describe('FormQuotationViewComponent', () => {
  let component: FormQuotationViewComponent;
  let fixture: ComponentFixture<FormQuotationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormQuotationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormQuotationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
