import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReinsurerEditComponent } from './user-reinsurer-edit.component';

describe('UserReinsurerEditComponent', () => {
  let component: UserReinsurerEditComponent;
  let fixture: ComponentFixture<UserReinsurerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReinsurerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReinsurerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
