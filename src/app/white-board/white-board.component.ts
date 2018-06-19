import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  isLoggedIn=false;

  constructor(private service: UserServiceClient) {
  }

  ngOnInit() {
   /* this.service.authenticate()
      .then(username => {
        if (username !== undefined && username !== '') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });*/
  }

}
