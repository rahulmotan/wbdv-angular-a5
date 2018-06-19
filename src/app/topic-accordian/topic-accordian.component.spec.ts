import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAccordianComponent } from './topic-accordian.component';

describe('TopicAccordianComponent', () => {
  let component: TopicAccordianComponent;
  let fixture: ComponentFixture<TopicAccordianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicAccordianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
