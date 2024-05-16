import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterRequestRejectListComponent } from './sinister-request-reject-list.component';

describe('SinisterRequestRejectListComponent', () => {
  let component: SinisterRequestRejectListComponent;
  let fixture: ComponentFixture<SinisterRequestRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinisterRequestRejectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinisterRequestRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
