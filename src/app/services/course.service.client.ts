export class CourseServiceClient {
  COURSE_URL = 'http://localhost:8080/api/course';
  AUTH_URL = 'http://localhost:4000/api/user/auth';

  findAllCourses() {
    return fetch(this.COURSE_URL)
      .then(response => response.json());
  }

  findCourseById(courseId) {
    return fetch(this.COURSE_URL + '/' + courseId)
      .then(response => response.json());
  }

  authenticate() {
    return fetch(this.AUTH_URL, {
      credentials: 'include'
    }).then(response => (response.json()));
  }

  findEnrolledCoursesForStudent(courseIds) {
    return fetch(this.COURSE_URL + 's', {
      method: 'POST',
      body: JSON.stringify(courseIds),
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => (response.json()));
  }
}
