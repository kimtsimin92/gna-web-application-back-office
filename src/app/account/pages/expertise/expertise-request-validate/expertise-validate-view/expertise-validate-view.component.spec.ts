import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseValidateViewComponent } from './expertise-validate-view.component';

describe('ExpertiseValidateViewComponent', () => {
  let component: ExpertiseValidateViewComponent;
  let fixture: ComponentFixture<ExpertiseValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseValidateViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertiseValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
