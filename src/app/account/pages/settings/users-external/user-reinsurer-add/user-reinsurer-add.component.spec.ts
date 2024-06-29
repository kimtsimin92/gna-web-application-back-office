import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReinsurerAddComponent } from './user-reinsurer-add.component';

describe('UserReinsurerAddComponent', () => {
  let component: UserReinsurerAddComponent;
  let fixture: ComponentFixture<UserReinsurerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReinsurerAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReinsurerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
