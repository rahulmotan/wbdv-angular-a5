import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';
import {CourseServiceClient} from '../services/course.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router) {
  }

  id;
  isAdmin;
  isEnrolled;
  username;
  password;
  email;
  phone;
  firstName;
  lastName;
  address;

  user = {
    username: '',
    password: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: ''
  };

  sections = [];
  enrolledCourses = [];

  validateField(field) {
    return field !== undefined && field !== '';
  }

  validateProfileForm(user) {
    const {username} = user;
    const {email} = user;
    const {phone} = user;
    const {firstName} = user;
    const {lastName} = user;
    const {address} = user;
    if (this.validateField(username) &&
      this.validateField(email) &&
      this.validateField(firstName) &&
      this.validateField(lastName) &&
      this.validateField(phone) &&
      this.validateField(address)) {
      return true;
    }
    return false;
  }

  update() {
    this.user = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      phone: this.phone,
      email: this.email
    };

    if (this.validateProfileForm(this.user)) {
      this.service.updateUser(this.user)
        .then(
          (user) => {
            alert('updated');
            console.log({user});
          }
        )
      ;
    }
    else {
      alert('Please fill out each and every field');
    }

  }

  logout() {
    this.service.logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  ngOnInit() {
    this
      .service.profile()
      .then(users => {
        const user = users[0];
        console.log(user);
        if (this.validateProfileForm(user)) {
          this.username = user.username;
          this.password = user.password;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.address = user.address;
          this.phone = user.phone;
          this.email = user.email;
        }
        this.username = user.username;
      });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections)
      .then((sections) => (
        this.extractAllCourseIdsFromSections()
      )).then((courseIds) => {
      this.courseService.findEnrolledCoursesForStudent(courseIds)
        .then(courses => {
          this.enrolledCourses = courses;
          if (this.enrolledCourses.length > 0) {
            this.isEnrolled = true;
          }
          console.log(courses);
        });
    });
    this.service.authenticate()
      .then(response => {
        this.isAdmin = response.username !== undefined && response.username == 'admin';
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
