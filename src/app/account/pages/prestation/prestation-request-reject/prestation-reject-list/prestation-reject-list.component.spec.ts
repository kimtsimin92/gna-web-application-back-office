import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationRejectListComponent } from './prestation-reject-list.component';

describe('PrestationRejectListComponent', () => {
  let component: PrestationRejectListComponent;
  let fixture: ComponentFixture<PrestationRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationRejectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
