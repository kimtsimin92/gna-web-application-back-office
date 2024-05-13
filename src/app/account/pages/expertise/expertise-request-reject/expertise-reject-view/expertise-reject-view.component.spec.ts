import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseRejectViewComponent } from './expertise-reject-view.component';

describe('ExpertiseRejectViewComponent', () => {
  let component: ExpertiseRejectViewComponent;
  let fixture: ComponentFixture<ExpertiseRejectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseRejectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertiseRejectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
