import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {
  assets: Asset[] = [];
  selectedAsset?: Asset;

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.getAssets();
  }

  onSelect(asset: Asset): void {
    this.selectedAsset = asset;
  }

  getAssets(): void {
    this.assetService.getAssets()
    .subscribe(assets => this.assets = assets);
  }

}
