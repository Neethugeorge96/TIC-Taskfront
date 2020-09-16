import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: any = 'http://localhost:3000/testApi';

  constructor(
    private http: HttpClient
  ) { }

  getEmployeeLogin(params): any {
    return this.http.post<any>(
      this.url + '/login', params
    ).pipe(tap(res => res),
      catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse): any {
    return throwError(error.message || 'Service Error');
  }
}
