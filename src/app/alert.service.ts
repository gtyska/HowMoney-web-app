import { Injectable } from '@angular/core';
import { Alert, AlertCreate } from './alert';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { API_URL } from './constants';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private APIUrl = API_URL + '/api/Alert';

  /**
   * Handle HTTP operation that failed.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log error to the console
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T); // app keeps running by returning an empty result
    };
  }

  /** GET userAssets from the server */
  getAlerts(): Observable<Alert[]> {
    const user = this.tokenStorageService.getUser();
    const url = `${this.APIUrl}`;
    return this.http.get<Alert[]>(url).pipe(
        tap(_ => console.log('fetched alerts')),
        catchError(this.handleError<Alert[]>('getAlert', []))
      );
  }

  /** DELETE: add a new user to the server */
  addAlert(alert: AlertCreate) {
    const url = `${this.APIUrl}`;
    return this.http.post<Alert>(url, alert).pipe(
      tap(_ => console.log(`created alert: ${alert}`)),
      catchError(this.handleError<Alert>('addAlert'))
    );
  }

  /** DELETE: add a new user to the server */
  deleteAlert(id: number) {
    const url = `${this.APIUrl}/${id}`;
    return this.http.delete<Alert>(url).pipe(
      tap(_ => console.log(`deleted user asset with id=${id}`)),
      catchError(this.handleError<Alert>('deleteAlert'))
    );
  }


}
