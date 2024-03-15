import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuotationEditComponent } from './form-quotation-edit.component';

describe('FormQuotationEditComponent', () => {
  let component: FormQuotationEditComponent;
  let fixture: ComponentFixture<FormQuotationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormQuotationEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormQuotationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
