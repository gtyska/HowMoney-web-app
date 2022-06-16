import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { API_URL } from '../constants';

const ENDPOINT_API_AUTH = API_URL +'/api/Auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(ENDPOINT_API_AUTH + 'login', {
      email,
      password
    }, httpOptions)
  }

  register(email: string, name: string, surname: string, password: string, currencyPreference: string): Observable<any> {
    return this.http.post(ENDPOINT_API_AUTH + 'register', {
      email,
      name,
      surname,
      password,
      currencyPreference
    }, httpOptions)
  }
}
