import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UserAsset, UserAssetCreate } from '../user-asset';
import { UserAssetService } from '../_services/user-asset.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent implements OnInit {
  userAssets: UserAsset[] = [];
  selectedAsset?: UserAsset;
  valueToAdd: number = 0;
  isInvalidAmount = false;

  constructor(@Inject(DOCUMENT) private document: Document, private userAssetService: UserAssetService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getUserAssets();
  }

  setSelectedAsset(userAsset: UserAsset) {
    this.selectedAsset = userAsset;
  }

  onSelect(asset: UserAsset): void {
    console.log(this.selectedAsset);
    this.selectedAsset = asset;
  }

  deleteUserAsset(userAsset: UserAsset) {
    this.userAssets = this.userAssets.filter(u => u !== userAsset);
    this.userAssetService.deleteUserAsset(userAsset.assetId).subscribe();
    // this.reloadPage();
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
          // this.reloadPage();
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
            // this.reloadPage();
          }
        });
        this.selectedAsset.amount = newUserAssetAmount;
        this.document.getElementById("closeModalSubstract")?.click();
        event.target.valueToSubstract.value = 0;
      }
    }
  }

  getUserAssets(): void {
    this.userAssetService.getUserAssets()
    .subscribe(userAssets => this.userAssets = userAssets.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    );
  }

}
