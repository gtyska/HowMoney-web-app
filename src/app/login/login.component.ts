import { Component, OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
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
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      // try to simplify
      error: err => {
        try {
          this.errorMessage = `${JSON.stringify(err.error).slice(1, -1)}`;
        }
        catch(error) {
          this.errorMessage = err.error.message;
        }
        if (this.errorMessage == '"isTrusted":true') {
          this.errorMessage = "Something went wrong by the server side."
        }
        this.isLoginFailed = true;
      }
    })
  }
  reloadPage(): void {
    window.location.reload();
  }

}
