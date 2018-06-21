import {Component, OnInit} from '@angular/core';
import {CourseServiceClient} from '../services/course.service.client';
import {SectionServiceClient} from '../services/section.service.client';
import {Course} from '../models/coruse.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  allCourses: Course[] = [];
  selectedCourse = new Course();
  sections = [];
  courseId = -1;
  sectionId;
  sectionName;
  seats;
  selectedSection = {};

  constructor(private service: CourseServiceClient,
              private sectionsService: SectionServiceClient,
              private userService: UserServiceClient,
              private router: Router) {
  }

  loadSections(courseId) {
    this.courseId = courseId;
    this.sectionsService
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections)
      .then(() => this.service.findCourseById(courseId))
      .then(course => {
        console.log(course);
        this.selectedCourse = course;
      });
  }

  selectSection(section) {
    this.selectedSection = section;
    this.sectionName = section.name;
    this.seats = section.seats;
    this.sectionId = section._id;
    console.log(this.sectionId);
    console.log(this.selectedSection);

  }

  logout() {
    this.userService.logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  createSection() {
    if (this.courseId !== -1) {
      var selectedCourse = new Course();
      this.allCourses.map(course => {
        if (course.id == this.courseId) {
          selectedCourse = course;
        }
      });
      if (selectedCourse !== undefined) {
        let sectionName = selectedCourse.title + ' Section 1';
        let seats = 20;
        console.log(sectionName);
        this
          .sectionsService
          .createSection(this.courseId, sectionName, seats)
          .then(() => {
            this.loadSections(this.courseId);
          });
      }
    } else {
      alert('Please select a course first');
    }
  }

  deleteSection() {
    this.sectionsService.deleteSection(this.sectionId)
      .then(response => {
        console.log(response);
        if (response.ok) {
          alert('Deleted');
        }
      }).then(() => this.loadSections(this.courseId));
  }

  updateSection(sectionName, seats) {
    let section = {
      courseId: this.courseId,
      name: sectionName,
      seats: seats,
    };
    console.log(section);
    this.sectionsService.updateSection(section, this.sectionId, this.courseId)
      .then((section) => {
        this.sectionName = section.name;
        this.seats = section.seats;
        this.loadSections(this.courseId);
      });
  }

  ngOnInit() {
    this.service.findAllCourses()
      .then(courses => {
        this.allCourses = courses;
        console.log(courses);
      });
  }

}
