import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSaveComponent } from './partner-save.component';

describe('PartnerSaveComponent', () => {
  let component: PartnerSaveComponent;
  let fixture: ComponentFixture<PartnerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
