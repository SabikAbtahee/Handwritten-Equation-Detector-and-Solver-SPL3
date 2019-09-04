import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDefaultComponent } from './profile-default.component';

describe('ProfileDefaultComponent', () => {
  let component: ProfileDefaultComponent;
  let fixture: ComponentFixture<ProfileDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
