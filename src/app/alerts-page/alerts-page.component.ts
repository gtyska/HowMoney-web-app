import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TotalAssetValueService } from '../total-asset-value.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserAssetService } from '../_services/user-asset.service';

@Component({
  selector: 'app-alerts-page',
  templateUrl: './alerts-page.component.html',
  styleUrls: ['./alerts-page.component.scss']
})
export class AlertsPageComponent implements OnInit, OnDestroy {

  constructor(private tokenStorage: TokenStorageService,
    private userAssetService: UserAssetService) { }

  currencyPreference = this.tokenStorage.getUser().currencyPreference
  isLoggedIn = false;


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  ngOnDestroy(): void {

  }

}

