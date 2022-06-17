import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-alerts-page',
  templateUrl: './alerts-page.component.html',
  styleUrls: ['./alerts-page.component.scss']
})
export class AlertsPageComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  currencyPreference = this.tokenStorage.getUser().currencyPreference;
  isLoggedIn = false;

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
}
