import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationValidateListComponent } from './prestation-validate-list.component';

describe('PrestationValidateListComponent', () => {
  let component: PrestationValidateListComponent;
  let fixture: ComponentFixture<PrestationValidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationValidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationValidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
