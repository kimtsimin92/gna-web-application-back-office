import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoinsurerViewComponent } from './user-coinsurer-view.component';

describe('UserCoinsurerViewComponent', () => {
  let component: UserCoinsurerViewComponent;
  let fixture: ComponentFixture<UserCoinsurerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoinsurerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCoinsurerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
