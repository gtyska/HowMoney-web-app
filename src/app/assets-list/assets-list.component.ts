import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset';
import { UserAsset } from '../user-asset';

import { ASSETS } from '../mock-assets';
import { USER_ASSETS } from '../mock-user-assets';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent implements OnInit {
  keys = ['name', 'amount'];
  assets = USER_ASSETS;
  selectedAsset?: UserAsset;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(asset: UserAsset): void {
    this.selectedAsset = asset;
  }

  delete(asset: UserAsset): void {
    this.assets = this.assets.filter(a => a !== asset);
    // this.assetService.deleteHero(asset.id).subscribe();  // delete from sever
  }
}
