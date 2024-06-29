import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalViewComponent } from './capital-view.component';

describe('CapitalViewComponent', () => {
  let component: CapitalViewComponent;
  let fixture: ComponentFixture<CapitalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitalViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapitalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
