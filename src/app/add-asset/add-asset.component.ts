import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Asset } from '../asset';
import { AssetService } from '../_services/asset.service';
import { UserAsset, UserAssetCreate } from '../user-asset';
import { UserAssetService } from '../_services/user-asset.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { AssetsListService } from '../assets-list.service';


@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {

  assets: Asset[] = [];
  selectedAsset?: Asset;
  errorMessage = '';
  isAddingFailed = false;
  isAdded = false;

  form: any = {
    assetId: null,
    amount: null
  };

  constructor(private assetService: AssetService, private userAssetService: UserAssetService,
    private tokenStorageService: TokenStorageService,
    private assetListService: AssetsListService) { }

  ngOnInit(): void {
    this.getAssets();
  }

  updateAssetsList(asset: UserAsset, isAdding: boolean){
    if(isAdding) {
      this.assetListService.addToAssetList(asset);
    }
    else {
      this.assetListService.deleteFromAssetList(asset);
    }
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
    const { assetId, amount } = this.form;
    let userId = this.tokenStorageService.getUser().id;
    this.isAddingFailed = false;
    this.isAdded = false;
    let userAsset: UserAssetCreate = {
      userId: userId,
      assetId: assetId,
      amount: Number(amount)
    }
    console.log('User asset to create', userAsset);
    this.userAssetService.addUserAsset(userAsset).subscribe({
      next: createdUserAsset => {
        this.isAdded = true;
        const isAdding = true;
        this.updateAssetsList(createdUserAsset, isAdding);
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

  reloadPage(): void {
    window.location.reload();
  }
}
