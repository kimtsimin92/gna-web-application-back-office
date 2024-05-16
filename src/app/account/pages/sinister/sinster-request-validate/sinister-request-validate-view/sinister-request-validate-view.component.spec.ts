import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterRequestValidateViewComponent } from './sinister-request-validate-view.component';

describe('SinisterRequestValidateViewComponent', () => {
  let component: SinisterRequestValidateViewComponent;
  let fixture: ComponentFixture<SinisterRequestValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinisterRequestValidateViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinisterRequestValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
