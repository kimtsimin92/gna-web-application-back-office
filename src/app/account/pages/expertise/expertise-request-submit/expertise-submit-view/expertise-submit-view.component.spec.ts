import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseSubmitViewComponent } from './expertise-submit-view.component';

describe('ExpertiseSubmitViewComponent', () => {
  let component: ExpertiseSubmitViewComponent;
  let fixture: ComponentFixture<ExpertiseSubmitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseSubmitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertiseSubmitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
