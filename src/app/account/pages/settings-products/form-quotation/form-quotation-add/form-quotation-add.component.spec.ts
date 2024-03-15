import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuotationAddComponent } from './form-quotation-add.component';

describe('FormQuotationAddComponent', () => {
  let component: FormQuotationAddComponent;
  let fixture: ComponentFixture<FormQuotationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormQuotationAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormQuotationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
