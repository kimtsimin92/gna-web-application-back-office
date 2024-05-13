import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseRejectListComponent } from './expertise-reject-list.component';

describe('ExpertiseRejectListComponent', () => {
  let component: ExpertiseRejectListComponent;
  let fixture: ComponentFixture<ExpertiseRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseRejectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertiseRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
