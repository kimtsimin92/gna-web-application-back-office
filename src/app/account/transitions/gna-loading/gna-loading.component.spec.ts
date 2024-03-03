import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnaLoadingComponent } from './gna-loading.component';

describe('GnaLoadingComponent', () => {
  let component: GnaLoadingComponent;
  let fixture: ComponentFixture<GnaLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GnaLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GnaLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
