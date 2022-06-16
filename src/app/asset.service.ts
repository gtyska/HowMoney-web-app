import { Injectable } from '@angular/core';
import { Asset } from './asset';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenStorageService } from './_services/token-storage.service';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})


export class AssetService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private APIUrl = API_URL + '/api/Asset';

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

  /** GET userAssets from the server */
  getAssets(): Observable<Asset[]> {
    const url = `${this.APIUrl}`;
    return this.http.get<Asset[]>(url).pipe(
        tap(_ => console.log('fetched users assets')),
        catchError(this.handleError<Asset[]>('getAsstes', []))
      );
  }
}
