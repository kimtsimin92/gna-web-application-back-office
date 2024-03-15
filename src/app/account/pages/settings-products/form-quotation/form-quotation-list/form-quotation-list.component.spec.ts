import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuotationListComponent } from './form-quotation-list.component';

describe('FormQuotationListComponent', () => {
  let component: FormQuotationListComponent;
  let fixture: ComponentFixture<FormQuotationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormQuotationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormQuotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
