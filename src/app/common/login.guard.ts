import { CanActivate , Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../core/services/users.service';

@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private router: Router, private userService: UsersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isUserAuthenticated()) {
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
