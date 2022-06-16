import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserAssetService } from '../_services/user-asset.service';

@Component({
  selector: 'app-assets-page',
  templateUrl: './assets-page.component.html',
  styleUrls: ['./assets-page.component.scss']
})
export class AssetsPageComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private userAssetService: UserAssetService) { }

  currencyPreference = this.tokenStorage.getUser().currencyPreference
  totalValue = 0
  isLoggedIn = false;

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.getTotalAssetsValue();
  }

  getTotalAssetsValue(): void {
    this.userAssetService.getUserAssetsTotalValue()
    .subscribe(totalValue => this.totalValue = totalValue);
  }

}
