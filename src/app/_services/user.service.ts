import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { API_URL } from '../constants';

const API_URL_USER = API_URL + '/api/User/';

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
}
