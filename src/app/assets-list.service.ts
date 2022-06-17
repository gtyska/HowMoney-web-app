import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserAsset } from './user-asset';

@Injectable({
  providedIn: 'root'
})

export class AssetsListService {
  private _assetList: UserAsset[] = [];
  private assetList: Subject<UserAsset[]> = new Subject<any>();

  sendAssetList(assetList: UserAsset[]) {
    this._assetList = assetList;
    this.sortHelperAssetList();
    this.assetList.next(this._assetList);
    console.log("Total asset list changed to:", this._assetList);
  }

  deleteFromAssetList(asset: UserAsset) {
    this._assetList = this._assetList.filter(x => x !== asset);
    this.sortHelperAssetList();
    this.assetList.next(this._assetList);
    console.log("Total asset list changed to:", this._assetList);
  }

  addToAssetList(asset: UserAsset) {
    this._assetList.push(asset);
    this.sortHelperAssetList();
    this.assetList.next(this._assetList);
    console.log("Total asset list changed to:", this._assetList);
  }

  getAssetList(): Observable<any> {
      return this.assetList.asObservable();
  }

  sortHelperAssetList(){
    this._assetList = this._assetList.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  }
}
