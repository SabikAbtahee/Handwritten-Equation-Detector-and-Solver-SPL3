import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDefaultComponent } from './history-default.component';

describe('HistoryDefaultComponent', () => {
  let component: HistoryDefaultComponent;
  let fixture: ComponentFixture<HistoryDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
