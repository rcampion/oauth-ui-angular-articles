import { Directive, ElementRef, Input, OnInit} from '@angular/core';
import { UsersService } from '../core/services/users.service';

@Directive({
    selector: '[appIsAuthorized]',
    providers: [UsersService]
})
export class IsAuthorizedDirective implements OnInit {
    @Input('appIsAuthorized') role: string;
    constructor(private elementRef: ElementRef, private userService: UsersService) {

    }
    ngOnInit(): void {
        if (this.role && this.role.trim() !== '' && !this.userService.isUserAuthorized([this.role])) {
            const el: HTMLElement = this.elementRef.nativeElement;
            el.parentNode.removeChild(el);
        }
    }
}
