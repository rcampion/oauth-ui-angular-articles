import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng8-contacts';

  userService: UsersService;

  date: string;

  constructor(router: Router, userService: UsersService) {
    const self = this;
    this.userService = userService;
    this.date = this.getDate();
  }
  ngOnInit() {
    this.userService.populate();
  }

  logout(): void {
    this.userService.logout();
  }

  getDate() {
    var theDate = new Date();
    var theTime = theDate.getTime();
    var months = new Array("January", "February", "March",
      "April", "May", "June", "July", "August",
      "September", "October", "November", "December");
    //Ensure correct for language. English is "January 1, 2020"
    var TODAY = months[theDate.getMonth()] + " "
      + theDate.getDate() + ", " + theDate.getFullYear();
    var DATETIME = months[theDate.getMonth()] + " "
      + theDate.getDate() + ", " + theDate.getFullYear()
      + ", " + theTime;
    var DAYS = (((((theTime / 1000) / 60) / 60) / 24) / 365);

    return TODAY;
  }
}

