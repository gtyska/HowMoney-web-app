import { Component, OnInit } from '@angular/core';
import { CURRENCY_PREFERENCE } from '../constants';
import { TokenStorageService } from '../_services/token-storage.service';

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
  userEmail?: string;
  userCurrencyPreference?: string;

  currencyPreferences = CURRENCY_PREFERENCE;

  constructor(private tokenStorageService: TokenStorageService) { }

  form: any = {
    name: null,
    surname: null,
    email: null,
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
      this.userEmail = user.email;
      this.userName = user.name;
      this.userSurname = user.surname;
      this.userCurrencyPreference = user.currencyPreference;
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
  }

  changeProfileData() {
    // send POST to user's endpoint
  }

}
