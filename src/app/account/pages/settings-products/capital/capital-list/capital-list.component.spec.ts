import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalListComponent } from './capital-list.component';

describe('CapitalListComponent', () => {
  let component: CapitalListComponent;
  let fixture: ComponentFixture<CapitalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapitalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
