import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoinsurerAddComponent } from './user-coinsurer-add.component';

describe('UserCoinsurerAddComponent', () => {
  let component: UserCoinsurerAddComponent;
  let fixture: ComponentFixture<UserCoinsurerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoinsurerAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCoinsurerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
