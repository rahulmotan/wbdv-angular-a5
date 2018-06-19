import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) {
  }
  username;
  password;
  password2;
  invalid;

  validatePassword(password2){
    if(this.password.includes(password2)){
      this.invalid = false;
    }else{
      this.invalid = true;
    }
  }
  register(username, password, password2) {
    if (password === password2) {
      this.service
        .createUser(username, password)
        .then((response) => {
          return response.json();
        }).then(response => {
        if (response.message !== undefined) {
          alert(response.message);
        } else {
          this.router.navigate(['profile']);
        }
      });
    } else {
      this.invalid = true;
      alert('Passwords do not match');
    }
  }

  ngOnInit() {
    this.invalid = false;
  }

}
