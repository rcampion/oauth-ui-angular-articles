import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppService } from './core/services/app.service';
import { UsersService } from './core/services/users.service';
import { SocketClientService } from './core/services/socket-client.service';
import { AuthenticationService } from './core/services/authentication.service';
import { DataSharingService } from './core/services/datasharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'ng9-articles';

  private appService: AppService;
  private userService: UsersService;
  private dataService: SocketClientService;
  private authService: AuthenticationService;

  date: string;

  messages9: any;
  mysubid9 = 'my-subscription-id-009';

  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    router: Router,
    appService: AppService,
    userService: UsersService,
    dataService: SocketClientService,
    authService: AuthenticationService,
    private dataSharingService: DataSharingService) {

    this.appService = appService;
    this.userService = userService;
    this.dataService = dataService;
    this.authService = authService;

    this.date = this.getDate();
  }

  ngOnInit() {
    this.userService.populate();
    // this.userService.logout();

  }

  ngAfterViewInit(): void {
    this.dataService.connect().subscribe(res => {
      console.log(res);

      this.messages9 = this.authService
        .onUpdate(this.mysubid9)
        .pipe(takeUntil(this.unsubscribeSubject))
        .subscribe(post => {

          // this.dataSource.loadLogs('', '', 'asc', 0, 6);

          // this.dataSource.refresh(post);

          console.log(post);

          const isLoggedIn = this.appService.checkCredentials();

          if (isLoggedIn) {

            this.userService.getUserViaSSO();

            // window.location.reload();
/*
            this.href = this.router.url;

            this.router.navigateByUrl('/header', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.href]);
            });
*/
            this.dataSharingService.isUserLoggedIn.next(true);

          } else {
/*
            // window.location.reload();
            this.href = this.router.url;

            this.router.navigateByUrl('/header', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.href]);
            });
*/
            this.dataSharingService.isUserLoggedIn.next(false);
          }

        });

    });
  }

  logout(): void {
    this.userService.logout();
  }

  connectWebSocket() {
    this.dataService.connect();
    //this.authService.connect();
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

