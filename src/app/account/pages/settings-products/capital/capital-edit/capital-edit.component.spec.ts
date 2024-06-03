import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalEditComponent } from './capital-edit.component';

describe('CapitalEditComponent', () => {
  let component: CapitalEditComponent;
  let fixture: ComponentFixture<CapitalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitalEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapitalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
