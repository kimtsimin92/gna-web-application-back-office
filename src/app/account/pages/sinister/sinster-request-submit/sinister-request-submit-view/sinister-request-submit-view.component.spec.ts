import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterRequestSubmitViewComponent } from './sinister-request-submit-view.component';

describe('SinisterRequestSubmitViewComponent', () => {
  let component: SinisterRequestSubmitViewComponent;
  let fixture: ComponentFixture<SinisterRequestSubmitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinisterRequestSubmitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinisterRequestSubmitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
