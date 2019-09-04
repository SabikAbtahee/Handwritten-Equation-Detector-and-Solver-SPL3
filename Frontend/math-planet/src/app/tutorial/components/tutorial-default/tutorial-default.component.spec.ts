import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDefaultComponent } from './tutorial-default.component';

describe('TutorialDefaultComponent', () => {
  let component: TutorialDefaultComponent;
  let fixture: ComponentFixture<TutorialDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
