import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset';
import { UserAsset } from '../user-asset';

import { ASSETS } from '../mock-assets';
import { USER_ASSETS } from '../mock-user-assets';

import { UserAssetService } from '../user-asset.service';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent implements OnInit {
  keys = ['name', 'amount'];
  userAssets: UserAsset[] = [];
  selectedAsset?: UserAsset;

  constructor(private userAssetService: UserAssetService) { }

  ngOnInit(): void {
    this.getUserAssets();
  }

  onSelect(asset: UserAsset): void {
    this.selectedAsset = asset;
  }

  // add(assetId: string, value: number): void {
  //   // assetId= name.trim();
  //   // if (!name) { return; }
  //   this.userAssetService.addUserAsset(assetId, value)
  //     .subscribe(asset => {
  //       this.userAssets.push(asset);
  //     });
  // }

  // delete(asset: UserAsset): void {
  //   this.userAssets = this.userAssets.filter(a => a !== asset);
  //   this.userAssetService.deleteUserAsset(asset.id).subscribe();
  // }

  getUserAssets(): void {
    this.userAssetService.getUserAssets()
    .subscribe(userAssets => this.userAssets = userAssets);
  }



  // delete(asset: UserAsset): void {
  //   this.userAssets = this.userAssets.filter(a => a !== asset);
  //   // this.assetService.deleteHero(asset.id).subscribe();  // delete from sever
  // }
}
