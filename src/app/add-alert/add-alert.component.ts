import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Asset } from '../asset';
import { AssetService } from '../_services/asset.service';
import { UserAssetService } from '../_services/user-asset.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Alert, AlertCreate } from '../alert';
import { AlertService } from '../alert.service';
import { CURRENCY_PREFERENCE } from '../constants';

@Component({
  selector: 'app-add-alert',
  templateUrl: './add-alert.component.html',
  styleUrls: ['./add-alert.component.scss']
})
export class AddAlertComponent implements OnInit {
  currencies= CURRENCY_PREFERENCE;
  assets: Asset[] = [];
  selectedAsset?: Asset;

  errorMessage = '';
  isAddingFailed = false;
  isAdded = false;

  form: any = {
    assetId: null,
    currency: null,
    amount: null
  };

  constructor(private assetService: AssetService, private alertService: AlertService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getAssets();
  }

     // is this method used?
  selectAsset(event: any): void {
    this.selectedAsset = event.target.value;
    console.log('selected asset', this.selectAsset);
  }

  getAssets(): void {
    this.assetService.getAssets()
    .subscribe(assets => this.assets = assets);
  }

  onSubmit(): void {
    const { assetId, currency, amount } = this.form;
    this.isAddingFailed = false;
    this.isAdded = false;

    let alert: AlertCreate = {
      value: Number(amount),
      currency: currency,
      asset_name: assetId
    }

    console.log('Alert to create', alert);
    this.alertService.addAlert(alert).subscribe({
      next: _ => {
        this.isAdded = true;
      },
      error: err => {
        try {
          console.log("error", err.error);
          console.log("status", err.status);
          if (err.status == 400) {
            this.errorMessage = "This asset already exists."
          }
          else if (err.status == 500) {
            this.errorMessage = "Server is currently not working."
          }
        }
        catch(error) {
          this.errorMessage = err.error.message;
        }
        this.isAddingFailed = true;
      }
    });
  }



}






