import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseValidateListComponent } from './expertise-validate-list.component';

describe('ExpertiseValidateListComponent', () => {
  let component: ExpertiseValidateListComponent;
  let fixture: ComponentFixture<ExpertiseValidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseValidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertiseValidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
