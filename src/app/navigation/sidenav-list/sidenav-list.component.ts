import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../core/services/app.service';
import { UsersService } from '../../core/services/users.service';
import { DataSharingService } from 'src/app/core/services/datasharing.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
    userService: UsersService;
    @Output() sidenavClose = new EventEmitter();

    mySubscription: any;

    isUserLoggedIn: boolean = false;

    constructor(router: Router, 
        private appService: AppService,
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
    }

    ngOnDestroy(): void {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    public onSidenavClose = () => {
        this.sidenavClose.emit();
    }

    login() {
        this.logout();
        this.appService.login();
        this.sidenavClose.emit();
    }

    logout(): void {
        this.appService.logout();
        this.userService.logout();
        this.sidenavClose.emit();
    }
}
