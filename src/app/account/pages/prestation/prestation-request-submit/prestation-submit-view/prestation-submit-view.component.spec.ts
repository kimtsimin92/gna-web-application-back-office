import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationSubmitViewComponent } from './prestation-submit-view.component';

describe('PrestationSubmitViewComponent', () => {
  let component: PrestationSubmitViewComponent;
  let fixture: ComponentFixture<PrestationSubmitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationSubmitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationSubmitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
