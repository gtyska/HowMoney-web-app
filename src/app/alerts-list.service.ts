import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertsListService {
  private _alertList: Alert[] = [];
  private alertList: Subject<Alert[]> = new Subject<any>();

  sendAlertList(alertList: Alert[]) {
    this._alertList = alertList;
    this.sortHelperAlertList();
    this.alertList.next(this._alertList);
    console.log("Alert list changed to:", this._alertList);
  }

  deleteFromAlertList(alert: Alert) {
    this._alertList = this._alertList.filter(x => x !== alert);
    this.sortHelperAlertList();
    this.alertList.next(this._alertList);
    console.log("Alert list changed to:", this._alertList);
  }

  addToAlertList(alert: Alert) {
    this._alertList.push(alert);
    this.sortHelperAlertList();
    this.alertList.next(this._alertList);
    console.log("Total asset list changed to:", this._alertList);
  }

  getAlertList(): Observable<any> {
      return this.alertList.asObservable();
  }

  sortHelperAlertList(){
    this._alertList = this._alertList.sort((a, b) => a.asset_name.toLowerCase() > b.asset_name.toLowerCase() ? 1 : -1);
  }
}
