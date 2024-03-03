import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileManagementSaveComponent } from './user-profile-management-save.component';

describe('UserProfileManagementSaveComponent', () => {
  let component: UserProfileManagementSaveComponent;
  let fixture: ComponentFixture<UserProfileManagementSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileManagementSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileManagementSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
