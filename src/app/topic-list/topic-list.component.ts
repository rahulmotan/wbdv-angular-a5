import {Component, OnInit} from '@angular/core';
import {TopicServiceClient} from '../services/topic.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  constructor(private service: TopicServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));
  }

  moduleId;
  lessonId;
  courseId;
  topicId;
  topics = [];

  setParams(params) {
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    this.topicId = params['topicId'];
    console.log(this.topicId);
    this.loadTopics(this.lessonId);
  }

  loadTopics(lessonId) {
    this.service.findAllTopicsForLessons(lessonId)
      .then(topics => this.topics = topics);
  }

  ngOnInit() {
  }

}
