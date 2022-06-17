import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit} from '@angular/core';
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

  formForgotPassword: any = {
    emailForgotPassword: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isResetFailed = false;
  isEmailSent = false;

  constructor(@Inject(DOCUMENT) private document: Document,
   private authService: AuthService, private tokenStorage: TokenStorageService) { }

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

  onSubmitGetNewPassword(event: any) {
    this.isResetFailed= false;
    this.isEmailSent = false;
    let email = event.target.email.value;
    console.log("Email to send mail with new password", email);

    this.authService.resetPassword(email).subscribe({
      next: _ => {
        this.isEmailSent = true;
      },
      error: err => {
        try {
          console.log("status", err.status);
          if (err.status == 200) {
            this.isEmailSent = true;
          }
          else if (err.status == 400) {
            this.errorMessage = "The account with this email does not exist."
          }
          else if (err.status == 500) {
            this.errorMessage = "Server is currently not working."
          }
        }
        catch(error) {
          console.log(error);
        }
        if (!this.isEmailSent) {
          this.isResetFailed = true;
        }
      }
    });
  }


}
