import { Injectable } from '@angular/core';
import { UserAsset, UserAssetCreate } from '../user-asset';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserAssetService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private APIUrl = API_URL + '/api/UserAsset';

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
  getUserAssets(): Observable<UserAsset[]> {
    const user = this.tokenStorageService.getUser();
    const url = `${this.APIUrl}`;
    return this.http.get<UserAsset[]>(url).pipe(
        tap(_ => console.log('fetched users assets')),
        catchError(this.handleError<UserAsset[]>('getUserAsstes', []))
      );
  }

  /** GET userAssets from the server */
  getUserAssetsTotalValue(): Observable<number> {
    const user = this.tokenStorageService.getUser();
    const url = `${this.APIUrl}/sum`;
    return this.http.get<number>(url).pipe(
        tap(_ => console.log('fetched users assets')),
        catchError(this.handleError<number>('getUserAsstes', 0))
      );
  }

  /** GET userAsset by id. Will 404 if id not found */
  getUserAsset(userId: string, assetId: string): Observable<UserAsset> {
    const url = `${this.APIUrl}/${userId}%2C${assetId}`;
    return this.http.get<UserAsset>(url).pipe(
      tap(_ => console.log(`fetched user asset id=${userId}%2C${assetId}`)),
      catchError(this.handleError<UserAsset>(`getUserAsset id=${userId}%2C${assetId}`))
    );
  }

  /** POST: add a new user to the server */
  addUserAsset(userAsset: UserAssetCreate): Observable<UserAsset> {
    return this.http.post<UserAsset>(this.APIUrl, userAsset, this.httpOptions).pipe(
      tap((newUserAsset: UserAsset) => console.log(`added user asset with assetId=${newUserAsset.assetId}`))
    );
  }

  /** POST: add a new user to the server */
  editUserAsset(userAsset: UserAssetCreate): Observable<UserAsset> {
    return this.http.put<UserAsset>(this.APIUrl, userAsset, this.httpOptions).pipe(
      tap((newUserAsset: UserAsset) => console.log(`added user asset with assetId=${newUserAsset.assetId}`)),
      catchError(this.handleError<UserAsset>('addUserAsset'))
    );
  }

  /** DELETE: add a new user to the server */
  deleteUserAsset(assetId: number) {
    const url = `${this.APIUrl}/${assetId}`;
    return this.http.delete<UserAsset>(url).pipe(
      tap(_ => console.log(`deleted user asset with assetId=${assetId}`)),
      catchError(this.handleError<UserAsset>('deleteUserAsset'))
    );
  }
}
