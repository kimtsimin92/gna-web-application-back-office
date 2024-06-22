import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReinsurerListComponent } from './user-reinsurer-list.component';

describe('UserReinsurerListComponent', () => {
  let component: UserReinsurerListComponent;
  let fixture: ComponentFixture<UserReinsurerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReinsurerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReinsurerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
