import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationRequestOpenListComponent } from './compensation-request-open-list.component';

describe('CompensationRequestOpenListComponent', () => {
  let component: CompensationRequestOpenListComponent;
  let fixture: ComponentFixture<CompensationRequestOpenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompensationRequestOpenListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompensationRequestOpenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
