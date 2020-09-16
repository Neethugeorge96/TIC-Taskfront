import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: any = 'http://localhost:3000/testApi';

  constructor(
    private http: HttpClient
  ) { }

  getEmployeeDetails(): any {
    return this.http.get<any>(
      this.url + '/employees'
    ).pipe(tap(res => res),
      catchError(this.errorHandler));
  }

  saveEmployeeDetails(params): any {
    return this.http.post<any>(
      this.url + '/emp_register', params
    ).pipe(tap(res => res),
      catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse): any {
    return throwError(error.message || 'Service Error');
  }
}
