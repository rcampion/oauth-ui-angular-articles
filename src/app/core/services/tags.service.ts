import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class TagsService {
  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  getAll(): Observable<[string]> {
    return this.get('/tags')
      .pipe(map(data => data.tags));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        }),
      params
    })
      .pipe(catchError(this.formatErrors));
  }
}
