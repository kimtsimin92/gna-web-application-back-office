import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationRequestOpenViewComponent } from './compensation-request-open-view.component';

describe('CompensationRequestOpenViewComponent', () => {
  let component: CompensationRequestOpenViewComponent;
  let fixture: ComponentFixture<CompensationRequestOpenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompensationRequestOpenViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompensationRequestOpenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
