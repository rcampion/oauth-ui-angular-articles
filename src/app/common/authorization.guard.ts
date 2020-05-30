import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../core/services/users.service';

@Injectable()
export class AuthorizationRouteGuard implements CanActivate {

    constructor(private router: Router, private userService: UsersService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userService.isUserAuthenticated() &&
            this.userService.isUserAuthorized(['ROLE_ADMIN'])) {
            return true;
        } else {
            this.router.navigate(['/about'], {
                queryParams: {
                    return: state.url
                }
            });
        }
        return false;
    }
}
