import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterRequestSubmitListComponent } from './sinister-request-submit-list.component';

describe('SinisterRequestSubmitListComponent', () => {
  let component: SinisterRequestSubmitListComponent;
  let fixture: ComponentFixture<SinisterRequestSubmitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinisterRequestSubmitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinisterRequestSubmitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
