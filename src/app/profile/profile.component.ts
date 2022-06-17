import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CURRENCY_PREFERENCE } from '../constants';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ChangeUser, UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  mode = "view";
  isLoggedIn = false;
  userName?: string;
  userSurname?: string;
  // userEmail?: string;
  userCurrencyPreference?: string;
  isPasswordChanged = false;
  isChangingPasswordFailed = true;
  errorMessage = "";

  currencyPreferences = CURRENCY_PREFERENCE;

  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService, private tokenStorageService: TokenStorageService, private userService: UserService) { }

  formChangePassword: any = {
    password: null,
    newPassword: null,
    newPasswordConfirm: null
  };

  form: any = {
    name: null,
    surname: null,
    // email: null,
    currencyPreference: null
  };

  ngOnInit(): void {
    var token = this.tokenStorageService.getToken();
    if(token != null) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.form.email = user.email;
      this.form.name = user.name;
      this.form.surname = user.surname;
      this.form.currencyPreference = user.currencyPreference;
    }
  }

  editProfile() {
    if(this.mode == "view") {
      this.mode = "edit"
    } else {
      this.changeProfileData();
      this.mode = "view"
    }
  }

  cancelEditProfile() {
    this.mode = "view";
    this.ngOnInit();
  }

  onSubmitChangePassword() {
    const user = this.tokenStorageService.getUser();
    const {password, newPassword, newPasswordConfirm} = this.formChangePassword;
    this.isPasswordChanged = false;
    this.isChangingPasswordFailed = false;
    // check if passwords match
    console.log("New password", newPassword);
    console.log("Confirmed new password", newPasswordConfirm);
    if(newPassword !== newPasswordConfirm) {
      this.isChangingPasswordFailed = true;
      this.errorMessage = "New passwords don't match."
    }
    else {
      // change password // 1stly create connection with backend for it
      this.authService.changePassword(password, newPassword).subscribe({
        next: data => {
          console.log("Password is changed");
          this.isPasswordChanged = true;
        },
        error: err => {
          try {
            console.log("Password change: error", err.error);
            console.log("Password change: status code", err.status);
            if (err.status == 400) {
              this.errorMessage = "Password is incorrect."
            }
            else if (err.status == 500) {
              this.errorMessage = "Server is currently not working."
            }
          }
          catch(error) {
            this.errorMessage = "Unexpected situation happened.";
          }
          this.isChangingPasswordFailed = true;
        }
      });
    }
  }

  changeProfileData() {
    console.log("Change profile data");
    const user = this.tokenStorageService.getUser();
    const {name, surname, email, currencyPreference} = this.form;
    let wasSomeChanges: boolean = false;
    // let wasEmailChanged = false;
    console.log("Name form input", name);
    console.log("Name form token", user.name);
    let changedUserObjects: ChangeUser[] =[];
    if (name != undefined && name != user.name) {
      let objectNewName: ChangeUser = {
        value: name,
        path: "Name",
        op: "replace",
      }
      changedUserObjects.push(objectNewName);
      wasSomeChanges = true;
    }
    if (surname != undefined && surname != user.surname) {
      let objectNewSurname: ChangeUser = {
        value: surname,
        path: "Surname",
        op: "replace",
      }
      changedUserObjects.push(objectNewSurname);
      wasSomeChanges = true;
    }
    // if (email != undefined && email != user.email) {
    //   let objectNewEmail: ChangeUser = {
    //     value: email,
    //     path: "Email",
    //     op: "replace",
    //   }
    //   changedUserObjects.push(objectNewEmail);
    //   wasSomeChanges = true;
    //   wasEmailChanged = true;
    // }
    if (currencyPreference != undefined && currencyPreference != user.currencyPreference) {
      let objectNewCurrencyPreference: ChangeUser = {
        value: currencyPreference,
        path: "CurrencyPreference",
        op: "replace",
      }
      changedUserObjects.push(objectNewCurrencyPreference);
      wasSomeChanges = true;
    }
    if(wasSomeChanges) {
      this.userService.changeUser(changedUserObjects).subscribe(
        data => {
          console.log(data.currencyPreference);
          user.name = data.name;
          user.surname = data.surname;
          // user.email = data.email;
          user.currencyPreference = data.currencyPreference;
          this.tokenStorageService.saveUser(user);
          this.form.email = user.email;
          this.form.name = user.name;
          this.form.surname = user.surname;
          this.form.currencyPreference = user.currencyPreference;
        }
      );
    }
  }

}
