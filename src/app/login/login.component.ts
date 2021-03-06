import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;

  login(username, password) {
    console.log([username, password]);
    this.service
      .login(username, password)
      .then((user) => {
        if (user.errorMsg !== undefined) {
          alert(user.errorMsg);
          this.router.navigate(['register']);
        } else {
          this.router.navigate(['profile']);
        }

      });
  }

  constructor(private router: Router,
              private service: UserServiceClient) {
  }

  ngOnInit() {
  }

}
