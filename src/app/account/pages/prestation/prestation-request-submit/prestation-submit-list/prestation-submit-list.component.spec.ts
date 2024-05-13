import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationSubmitListComponent } from './prestation-submit-list.component';

describe('PrestationSubmitListComponent', () => {
  let component: PrestationSubmitListComponent;
  let fixture: ComponentFixture<PrestationSubmitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationSubmitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationSubmitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
