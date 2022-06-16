import { Component, OnInit } from '@angular/core';
import { CURRENCY_PREFERENCE } from '../constants';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  currencyPreferences = CURRENCY_PREFERENCE;

  form: any = {
    email: null,
    password: null,
    name: null,
    surname: null,
    currencyPreference: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit(): void {
    const { email, password, name, surname, currencyPreference } = this.form;
    this.authService.register(email, name, surname, password, currencyPreference).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        try {
          this.errorMessage = `${JSON.stringify(err.error).slice(1, -1)}`;
        }
        catch(error) {  // is it needed?
          this.errorMessage = err.error.message;
        }
        this.isLoginFailed = true;
      }
    })
  }
  reloadPage(): void {
    window.location.reload();
  }

}
