import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoinsurerListComponent } from './user-coinsurer-list.component';

describe('UserCoinsurerListComponent', () => {
  let component: UserCoinsurerListComponent;
  let fixture: ComponentFixture<UserCoinsurerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoinsurerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCoinsurerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
