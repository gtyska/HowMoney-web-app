import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TotalAssetValueService } from '../total-asset-value.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserAssetService } from '../_services/user-asset.service';

@Component({
  selector: 'app-assets-page',
  templateUrl: './assets-page.component.html',
  styleUrls: ['./assets-page.component.scss']
})
export class AssetsPageComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  currencyPreference = this.tokenStorage.getUser().currencyPreference
  totalValue = 0
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private userAssetService: UserAssetService,
    private totalValueService: TotalAssetValueService) {
    this.subscription = this.totalValueService.getValue().subscribe(value => {
      if (value) {
        this.totalValue = value;
      } else {
        this.totalValue = 0;
      }
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.getTotalAssetsValue();
  }

  // getTotalAssetsValue(): void {
  //   this.userAssetService.getUserAssetsTotalValue()
  //   .subscribe(totalValue => this.totalValue = totalValue);
  // }

  getTotalAssetsValue(): void {
    this.userAssetService.getUserAssetsTotalValue()
    .subscribe(totalValue => this.totalValueService.sendValue(totalValue));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
