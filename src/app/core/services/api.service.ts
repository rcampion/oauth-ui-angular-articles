import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient
    ) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`, { 
            headers: new HttpHeaders(
                {
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Bearer ' + Cookie.get('access_token')
            }),
            params })
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            JSON.stringify(body), this.generateHeaders()
        ).pipe(catchError(this.formatErrors));
    }

    postOld(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            JSON.stringify(body), this.generateHeaders()
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            body, this.generateHeaders()
        ).pipe(catchError(this.formatErrors));
    }

    delete(path): Observable<any> {
        return this.http.delete(
			`${environment.api_url}${path}`, this.generateHeaders()
			
        ).pipe(catchError(this.formatErrors));
    }

    private generateHeaders() {
        return {

            headers: new HttpHeaders(
                {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + Cookie.get('access_token')
                })
        };
    }
}
