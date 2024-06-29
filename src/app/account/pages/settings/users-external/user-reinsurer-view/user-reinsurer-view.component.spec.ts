import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReinsurerViewComponent } from './user-reinsurer-view.component';

describe('UserReinsurerViewComponent', () => {
  let component: UserReinsurerViewComponent;
  let fixture: ComponentFixture<UserReinsurerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReinsurerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReinsurerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
