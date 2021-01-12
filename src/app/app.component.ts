import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppService } from './core/services/app.service';
import { UsersService } from './core/services/users.service';
import { SocketClientService } from './core/services/socket-client.service';
import { AuthenticationService } from './core/services/authentication.service';
import { DataSharingService } from './core/services/datasharing.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'ng9-articles';

  date: string;

  sessionUser: User;
  currentUser: User;

  messages20: any;
  mysubid20 = 'my-subscription-id-020';

  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private appService: AppService,
    private userService: UsersService,
    private wsDataService: SocketClientService,
    private authService: AuthenticationService,
    private dataSharingService: DataSharingService) {

    this.date = this.getDate();
  }

  ngOnInit() {

    const isLoggedIn = this.appService.checkCredentials();

    if (isLoggedIn) {
      this.userService.getUserViaSSO();
    }

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

  ngAfterViewInit(): void {

    this.wsDataService.connect().subscribe(res => {
      console.log(res);

      this.messages20 = this.authService
        .onUpdate(this.mysubid20)
        .pipe(takeUntil(this.unsubscribeSubject))
        .subscribe(post => {
          if ((post.message === 'Session Expired')
            || (post.message === 'Logged Out')) {
            if (this.appService.checkCredentials()) {
              this.sessionUser = post.data.data;
              this.currentUser = this.userService.getCurrentUser();
              if (this.sessionUser.userName === this.currentUser.userName) {
                this.userService.logout();
                this.appService.logout();
              }
            }
          }

          const isLoggedIn = this.appService.checkCredentials();

          if (isLoggedIn) {

            this.userService.getUserViaSSO();

            // this.dataSharingService.isUserLoggedIn.next(true);

          } else {

            this.dataSharingService.isUserLoggedIn.next(false);
          }

        });

    });
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

