import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationRequestCloseListComponent } from './compensation-request-close-list.component';

describe('CompensationRequestCloseListComponent', () => {
  let component: CompensationRequestCloseListComponent;
  let fixture: ComponentFixture<CompensationRequestCloseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompensationRequestCloseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompensationRequestCloseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
