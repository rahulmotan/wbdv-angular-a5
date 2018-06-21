import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {CourseServiceClient} from '../services/course.service.client';
import {Course} from '../models/coruse.model.client';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private router: Router,
              private authService: UserServiceClient,
              private courseService: CourseServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }
  
  isAdmin = false;
  sectionName = '';
  seats = 0;
  courseId = '';
  sections = [];
  course = new Course();

  findCourseById(courseId) {
    this.courseService.findCourseById(courseId)
      .then(course => this.course = course);
  }

  loadSections(courseId) {
    this.courseId = courseId;
    this
      .service
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections)
      .then(() => this.findCourseById(courseId));
  }

  logout() {
    this.authService.logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  createSection(sectionName, seats) {
    if (sectionName == '' && this.course !== undefined) {
      sectionName = this.course.title + ' Section 1';
    }
    if (seats == 0) {
      seats = 20;
    }
    this
      .service
      .createSection(this.courseId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  enroll(section) {
    this.service
      .enrollStudentInSection(section._id)
      .then(() => (
        this.loadSections(this.courseId)));
  }

  deroll(section) {
    console.log(section);
    this.service.deroll(section._id)
      .then(() => (
        this.loadSections(this.courseId)));
  }

  ngOnInit() {
    this.authService.authenticate()
      .then(user => {
        if (user.username !== undefined && user.username !== '') {
          if (user.username === 'admin') {
            this.isAdmin = true;
            console.log('user: ' + user.username);
          }
        } else {
          this.router.navigate(['register']);
        }
      });
  }

}
