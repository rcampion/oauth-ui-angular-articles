import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
    public isActiveContactsReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isUserContactsReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoginReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
