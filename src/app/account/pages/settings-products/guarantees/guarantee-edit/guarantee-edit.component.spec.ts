import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeEditComponent } from './guarantee-edit.component';

describe('GuaranteeEditComponent', () => {
  let component: GuaranteeEditComponent;
  let fixture: ComponentFixture<GuaranteeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuaranteeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuaranteeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
