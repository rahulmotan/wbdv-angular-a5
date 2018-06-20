import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  isLoggedIn = false;

  constructor(private service: UserServiceClient, private router: Router) {
  }

  logout() {
    this.service.logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  ngOnInit() {
    this.service.authenticate()
      .then(response => {
        if (response.username !== undefined && response.username !== '') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
  }

}
