import {Component, OnInit} from '@angular/core';
import {CourseServiceClient} from '../services/course.service.client';
import {Course} from '../models/coruse.model.client';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient, private sectionService: SectionServiceClient) {
  }

  courseIds = [];
  enrolledCourses: Course[] = [];
  allCourses: Course[] = [];
  sections = [];
  username;
  isEnrolled = false;

  ngOnInit() {
    this.service.findAllCourses()
      .then(courses => {
        this.allCourses = courses;
        console.log(courses);
      });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections)
      .then((sections) => (
        this.extractAllCourseIdsFromSections()
      )).then((courseIds) => {
      this.service.findEnrolledCoursesForStudent(courseIds)
        .then(courses => {
          this.enrolledCourses = courses;
          if (this.enrolledCourses.length > 0) {
            this.isEnrolled = true;
          }
          console.log(courses);
        });
    });

  }

  extractAllCourseIdsFromSections() {
    let courseIds = [];
    courseIds = this.sections.map(value => {
      return value.section.courseId;
    });
    return courseIds;
  }

}
