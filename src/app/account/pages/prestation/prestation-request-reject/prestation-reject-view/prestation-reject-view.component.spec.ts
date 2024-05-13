import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationRejectViewComponent } from './prestation-reject-view.component';

describe('PrestationRejectViewComponent', () => {
  let component: PrestationRejectViewComponent;
  let fixture: ComponentFixture<PrestationRejectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationRejectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationRejectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
