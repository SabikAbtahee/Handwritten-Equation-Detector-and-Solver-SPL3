import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDefaultComponent } from './practice-default.component';

describe('PracticeDefaultComponent', () => {
  let component: PracticeDefaultComponent;
  let fixture: ComponentFixture<PracticeDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
