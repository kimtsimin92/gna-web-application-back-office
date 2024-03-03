import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeAddComponent } from './guarantee-add.component';

describe('GuaranteeAddComponent', () => {
  let component: GuaranteeAddComponent;
  let fixture: ComponentFixture<GuaranteeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuaranteeAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuaranteeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
