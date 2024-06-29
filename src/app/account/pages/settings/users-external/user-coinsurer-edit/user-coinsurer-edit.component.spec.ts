import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoinsurerEditComponent } from './user-coinsurer-edit.component';

describe('UserCoinsurerEditComponent', () => {
  let component: UserCoinsurerEditComponent;
  let fixture: ComponentFixture<UserCoinsurerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoinsurerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCoinsurerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
