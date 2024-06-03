import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalFormComponent } from './capital-form.component';

describe('CapitalFormComponent', () => {
  let component: CapitalFormComponent;
  let fixture: ComponentFixture<CapitalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapitalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
