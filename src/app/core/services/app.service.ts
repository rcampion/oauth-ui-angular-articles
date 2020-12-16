import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError, takeUntil } from 'rxjs/operators';

import { UsersService } from '../../core/services/users.service';
import { SocketClientService } from '../../core/services/socket-client.service';
import { environment } from '../../../environments/environment';
import { Contact } from '../interface/contact.model';
import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';
import { DataSharingService } from './datasharing.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public clientId = 'newClient';
  //public redirectUri = 'http://localhost:8089/home';
  public redirectUri = environment.redirectUri;
  private http: HttpClient;
  private userService: UsersService;
  private dataService: SocketClientService;
  private authService: AuthenticationService;

  currentUser: User;

  messages9: any;
  mysubid9 = 'my-subscription-id-009';

  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(private handler: HttpBackend,
    userService: UsersService,
    dataService: SocketClientService,
    authService: AuthenticationService,
    private dataSharingService: DataSharingService) {

    this.http = new HttpClient(handler);
    this.userService = userService;
    this.dataService = dataService;
    this.authService = authService;
  }

  retrieveToken(code) {
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', 'newClientSecret');
    //params.append('client_secret', '5eb77bb1-f499-4cd5-bc30-540f7fe50a96');
    params.append('redirect_uri', this.redirectUri);
    params.append('code', code);

    let headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });

    this.http.post(environment.sso_url + '/realms/zdslogic/protocol/openid-connect/token', params.toString(), { headers: headers })
      .subscribe(
        data => {
          this.saveToken(data);

          this.userService.loginViaSSO();

          this.dataSharingService.isUserLoggedIn.next(true);

        /*
          this.connectWebSocket();

          this.dataService.connect().subscribe(res => {
            console.log(res);

            this.messages9 = this.authService
              .onUpdate(this.mysubid9)
              .pipe(takeUntil(this.unsubscribeSubject))
              .subscribe(post => {

                // this.dataSource.loadLogs('', '', 'asc', 0, 6);

                // this.dataSource.refresh(post);

                console.log(post);

              });

          });
          */

        },
        err => alert(err + '\nInvalid Credentials')
      );
  }

  connectWebSocket() {
    this.dataService.connect();
    //this.authService.connect();
  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate, '/');
    console.log('Obtained Access token');
  }

  getResource(resourceUrl): Observable<any> {
    var cookie = Cookie.get('access_token');
    var headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer ' + Cookie.get('access_token') });
    return this.http.get(resourceUrl, { headers: headers });
    //                 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  checkCredentials() {
    return Cookie.check('access_token');
  }

  login() {
    window.location.href = environment.sso_url + '/realms/zdslogic/protocol/openid-connect/auth?response_type=code&client_id=' +
      this.clientId + '&redirect_uri=' + this.redirectUri;
  }

  logout() {
    Cookie.delete('access_token', '/');
    this.userService.purgeAuth();
    this.dataSharingService.isUserLoggedIn.next(false);
    //let logoutURL = environment.sso_url + '/realms/zdslogic/protocol/openid-connect/logout?redirect_uri=' + this.redirectUri;
    //window.location.href = logoutURL;
  }
}