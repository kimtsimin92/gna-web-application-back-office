import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileManagementEditComponent } from './user-profile-management-edit.component';

describe('UserProfileManagementEditComponent', () => {
  let component: UserProfileManagementEditComponent;
  let fixture: ComponentFixture<UserProfileManagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileManagementEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
