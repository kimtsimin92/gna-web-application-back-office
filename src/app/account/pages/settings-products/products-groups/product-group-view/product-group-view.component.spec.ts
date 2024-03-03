import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupViewComponent } from './product-group-view.component';

describe('ProductGroupViewComponent', () => {
  let component: ProductGroupViewComponent;
  let fixture: ComponentFixture<ProductGroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductGroupViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
