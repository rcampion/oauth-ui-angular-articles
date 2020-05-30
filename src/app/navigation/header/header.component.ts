import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../core/models/user';
import { AppService } from '../../core/services/app.service';
import { UsersService } from '../../core/services/users.service';

@Component({
    selector: 'app-header',
    providers: [AppService],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    userService: UsersService;
    @Output() public sidenavToggle = new EventEmitter();
    currentUser: User;
    constructor(private _service: AppService, userService: UsersService) {
        this.userService = userService;
    }

    ngOnInit() {
        const isLoggedIn = this._service.checkCredentials();
        const i = window.location.href.indexOf('code');
        if (!isLoggedIn && i !== -1) {
            this._service.retrieveToken(window.location.href.substring(i + 5));
        }

        this.userService.currentUser.subscribe(
            (userData) => {
                this.currentUser = userData;
            }
        );
    }

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }

    login() {
        this._service.login();

    }

    logout(): void {
        this._service.logout();
        this.userService.logout();
    }
}
