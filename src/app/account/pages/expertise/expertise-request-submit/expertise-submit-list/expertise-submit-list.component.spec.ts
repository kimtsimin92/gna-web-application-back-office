import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseSubmitListComponent } from './expertise-submit-list.component';

describe('ExpertiseSubmitListComponent', () => {
  let component: ExpertiseSubmitListComponent;
  let fixture: ComponentFixture<ExpertiseSubmitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseSubmitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertiseSubmitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
