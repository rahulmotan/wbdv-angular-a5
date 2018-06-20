import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonServiceClient} from '../services/lesson.service.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-lesson-tabs',
  templateUrl: './lesson-tabs.component.html',
  styleUrls: ['./lesson-tabs.component.css']
})
export class LessonTabsComponent implements OnInit {

  constructor(private service: LessonServiceClient,
              private userService: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));
  }

  courseId;
  moduleId;
  lessonId;
  lessons = [];

  setParams(params) {
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    this.loadLessons(this.courseId, this.moduleId);
  }

  loadLessons(courseId, moduleId) {
    this.moduleId = moduleId;
    this.service.findLessonsForModule(courseId, moduleId)
      .then(lessons => this.lessons = lessons);
  }
  logout() {
    this.userService.logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  ngOnInit() {
  }

}
