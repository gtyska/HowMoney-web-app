import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UserAsset, UserAssetCreate } from '../user-asset';
import { UserAssetService } from '../_services/user-asset.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { TotalAssetValueService } from '../total-asset-value.service';
import { AssetsListService } from '../assets-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent implements OnInit {
  subscription?: Subscription;
  userAssets: UserAsset[] = [];
  selectedAsset?: UserAsset;
  valueToAdd: number = 0;
  isInvalidAmount = false;

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document,
    private userAssetService: UserAssetService, private tokenStorageService: TokenStorageService,
    private totalValueService: TotalAssetValueService,
    private assetListService: AssetsListService) {
      this.subscription = this.assetListService.getAssetList().subscribe(assetList => {
        if (assetList) {
          this.userAssets = assetList;
        } else {
          this.userAssets = [];
        }
      });
    }

  ngOnInit(): void {
    this.getUserAssets();
  }

  setSelectedAsset(userAsset: UserAsset) {
    this.selectedAsset = userAsset;
  }

  // getUserAssets(): void {
  //   this.userAssetService.getUserAssets()
  //   .subscribe(userAssets => this.userAssets = userAssets.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
  //   );
  // }

  getUserAssets(): void {
    this.userAssetService.getUserAssets()
    .subscribe(userAssets => this.assetListService.sendAssetList(userAssets));
  }

  updateAssetsList(asset: UserAsset, isAdding: boolean){
    if(isAdding) {
      this.assetListService.addToAssetList(asset);
    }
    else {
      this.assetListService.deleteFromAssetList(asset);
    }
  }

  getNewTotalAssetsValue(): void {
    this.userAssetService.getUserAssetsTotalValue()
    .subscribe(totalValue => this.totalValueService.sendValue(totalValue));
  }

  onSelect(asset: UserAsset): void {
    console.log(this.selectedAsset);
    this.selectedAsset = asset;
  }

  deleteUserAsset(userAsset: UserAsset) {
    // this.userAssets = this.userAssets.filter(u => u !== userAsset);
    this.userAssetService.deleteUserAsset(userAsset.assetId).subscribe(
      response => {
        this.getNewTotalAssetsValue();
        const isAdding = false;
        this.updateAssetsList(userAsset, isAdding);
      }
    );
  }

  onSubmitIncrement(event: any) {
    this.isInvalidAmount = false;
    let valueToAdd = event.target.valueToAdd.value;
    if (this.selectedAsset != undefined) {
      let oldUserAssetAmount = this.selectedAsset?.amount;
      let newUserAssetAmount: number = Number(oldUserAssetAmount) + Number(valueToAdd);

      let userId = this.tokenStorageService.getUser().id;
      let userAsset: UserAssetCreate = {
        userId: userId,
        assetId: this.selectedAsset.assetId,
        amount: newUserAssetAmount
      }

      this.selectedAsset.amount = newUserAssetAmount;
      console.log('Changed user asset amount to:', newUserAssetAmount);
      this.userAssetService.editUserAsset(userAsset).subscribe({
        next: _ => {
          this.getNewTotalAssetsValue();
        }
      });
      this.selectedAsset.amount = newUserAssetAmount;
      this.document.getElementById("closeModalAdd")?.click();
      event.target.valueToAdd.value = 0;
    }
  }

  onSubmitDecrement(event: any) {
    this.isInvalidAmount = false;
    let valueToSubstract = event.target.valueToSubstract.value;
    if (this.selectedAsset != undefined) {
      let oldUserAssetAmount = this.selectedAsset?.amount;
      let newUserAssetAmount: number = Number(oldUserAssetAmount) - Number(valueToSubstract);

      if(newUserAssetAmount <= 0) {
        this.isInvalidAmount = true;
      }

      else {
        let userId = this.tokenStorageService.getUser().id;
        let userAsset: UserAssetCreate = {
          userId: userId,
          assetId: this.selectedAsset.assetId,
          amount: newUserAssetAmount
        }

        this.selectedAsset.amount = newUserAssetAmount;
        console.log('Changed user asset amount to:', newUserAssetAmount);
        this.userAssetService.editUserAsset(userAsset).subscribe({
          next: _ => {
            this.getNewTotalAssetsValue();
          }
        });
        this.selectedAsset.amount = newUserAssetAmount;
        this.document.getElementById("closeModalSubstract")?.click();
        event.target.valueToSubstract.value = 0;

      }
    }
  }

}
