import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagerSaveComponent } from './users-manager-save.component';

describe('UsersManagerSaveComponent', () => {
  let component: UsersManagerSaveComponent;
  let fixture: ComponentFixture<UsersManagerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManagerSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersManagerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
