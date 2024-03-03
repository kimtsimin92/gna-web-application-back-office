import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileManagementViewComponent } from './user-profile-management-view.component';

describe('UserProfileManagementViewComponent', () => {
  let component: UserProfileManagementViewComponent;
  let fixture: ComponentFixture<UserProfileManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileManagementViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
