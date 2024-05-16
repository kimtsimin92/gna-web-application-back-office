import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterRequestRejectViewComponent } from './sinister-request-reject-view.component';

describe('SinisterRequestRejectViewComponent', () => {
  let component: SinisterRequestRejectViewComponent;
  let fixture: ComponentFixture<SinisterRequestRejectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinisterRequestRejectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinisterRequestRejectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
