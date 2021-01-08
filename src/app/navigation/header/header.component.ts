import { Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../../core/models/user';
import { AppService } from '../../core/services/app.service';
import { UsersService } from '../../core/services/users.service';
import { SocketClientService } from '../../core/services/socket-client.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataSharingService } from '../../core/services/datasharing.service';

@Component({
    selector: 'app-header',
    providers: [AppService],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
    userService: UsersService;
    @Output() public sidenavToggle = new EventEmitter();
    currentUser: User;

    mySubscription: any;

    isUserLoggedIn: boolean = false;

    constructor(
        private router: Router,
        private appService: AppService,
        private dataService: SocketClientService,
        private authService: AuthenticationService,
        userService: UsersService,
        private dataSharingService: DataSharingService) {

        this.userService = userService;

        // Subscribe here, this will automatically update 
        // "isUserLoggedIn" whenever a change to the subject is made.
        this.dataSharingService.isUserLoggedIn.subscribe(value => {
            this.isUserLoggedIn = value;
        });
    }



    ngOnInit() {
        const isLoggedIn = this.appService.checkCredentials();
        const i = window.location.href.indexOf('code');
        if (!isLoggedIn && i !== -1) {

            this.appService.retrieveToken(window.location.href.substring(i + 5));

        }

        this.userService.currentUser.subscribe(
            (userData) => {

                this.currentUser = userData;

            }
        );
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }

    login() {
        this.userService.purgeAuth();

        this.appService.login();

    }

    logout(): void {
        this.userService.logout();
        this.appService.logout();
    }

    public redirectToRegister = () => {
        const url = `/register`;
        this.router.navigate([url]);
    }
}
