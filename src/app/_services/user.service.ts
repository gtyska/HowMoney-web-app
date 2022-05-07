import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'https://localhost:5001/api/User/';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getUserData(userId: string): Observable<any> {
    return this.http.get(API_URL + userId,
    {
      responseType: 'text'
    });
  }
}
