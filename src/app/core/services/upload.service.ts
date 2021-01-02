import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL: string = "{Server URL}";

  constructor(private httpClient: HttpClient) { }

  public upload(formData) {
    const apiUrl = 'uploadFile';
    const headers = new HttpHeaders(
      {
        //'Content-Type': 'multipart/form-data',
        //'Accept': 'application/json'
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      }
    );
    return this.httpClient.post<any>(this.createCompleteRoute(apiUrl, environment.api_url), formData, {
      headers: headers,

      reportProgress: true,

      observe: 'events'

    });
  }

  public create = (route: string, body) => {
    return this.httpClient.post(this.createCompleteRoute(route, environment.api_url), body, this.generateHeaders());
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {

      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + Cookie.get('access_token')
        })
    };
  }
}