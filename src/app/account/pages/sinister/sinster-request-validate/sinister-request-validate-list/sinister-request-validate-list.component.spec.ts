import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterRequestValidateListComponent } from './sinister-request-validate-list.component';

describe('SinisterRequestValidateListComponent', () => {
  let component: SinisterRequestValidateListComponent;
  let fixture: ComponentFixture<SinisterRequestValidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinisterRequestValidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinisterRequestValidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
