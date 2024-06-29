import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsCloseListComponent } from './complaints-close-list.component';

describe('ComplaintsCloseListComponent', () => {
  let component: ComplaintsCloseListComponent;
  let fixture: ComponentFixture<ComplaintsCloseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsCloseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplaintsCloseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
