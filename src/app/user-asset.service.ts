import { Injectable } from '@angular/core';
import { UserAsset } from './user-asset';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAssetService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private APIUrl = 'https://localhost:5001/api/UserAsset';

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
  getUserAssets(): Observable<UserAsset[]> {
    const user = this.tokenStorageService.getUser();
    const url = `${this.APIUrl}/userId?userId=${user.id}`;
    return this.http.get<UserAsset[]>(url).pipe(
        tap(_ => console.log('fetched users assets')),
        catchError(this.handleError<UserAsset[]>('getUserAsstes', []))
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

  // /** PUT: update the hero on the server */
  // updateHero(hero: Hero): Observable<any> {
  //   const url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http.put(url, hero, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

  /** POST: add a new hero to the server */
  addUserAsset(userAsset: UserAsset): Observable<UserAsset> {
    return this.http.post<UserAsset>(this.APIUrl, userAsset, this.httpOptions).pipe(
      // tap((newUserAsset: UserAsset) => console.log(`added user asset w/ id=${newUserAsset.assetId}`)),
      catchError(this.handleError<UserAsset>('addHero'))
    );
  }

  // /** DELETE: delete the hero from the server */
  // deleteHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;

  //   return this.http.delete<Hero>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }


}















  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //       this.log(`found heroes matching "${term}"`) :
  //       this.log(`no heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

