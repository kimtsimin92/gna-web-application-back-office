import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitViewComponent } from './visit-view.component';

describe('VisitViewComponent', () => {
  let component: VisitViewComponent;
  let fixture: ComponentFixture<VisitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
