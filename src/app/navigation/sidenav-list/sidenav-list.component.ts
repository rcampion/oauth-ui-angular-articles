import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
    userService: UsersService;
    @Output() sidenavClose = new EventEmitter();

    constructor(router: Router, userService: UsersService) {
        this.userService = userService;
    }

    ngOnInit() {
    }

    public onSidenavClose = () => {
        this.sidenavClose.emit();
    }

    logout(): void {
        this.userService.logout();
        this.sidenavClose.emit();
    }
}
