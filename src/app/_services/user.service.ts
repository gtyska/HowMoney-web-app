import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { API_URL } from '../constants';

const API_URL_USER = API_URL + '/api/User/';

export interface ChangeUser {
  value: string,
  path: string,
  op: string,
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getUserData(userId: string): Observable<any> {
    return this.http.get(API_URL_USER + userId,
    {
      responseType: 'text'
    });
  }

  changeUser(changesInUser: ChangeUser[]): Observable<any> {
    return this.http.patch(API_URL_USER, changesInUser);
  }
}
