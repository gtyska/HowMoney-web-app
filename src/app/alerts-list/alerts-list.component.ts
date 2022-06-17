import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserAsset, UserAssetCreate } from '../user-asset';
import { TokenStorageService } from '../_services/token-storage.service';
import { Alert } from '../alert';
import { AlertService } from '../alert.service';
import { AlertsListService } from '../alerts-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})

export class AlertsListComponent implements OnInit {
  subscription?: Subscription;
  alerts: Alert[] = [];
  selectedAlert?: Alert;
  valueToAdd: number = 0;
  isInvalidAmount = false;

  constructor(@Inject(DOCUMENT) private document: Document,
    private alertService: AlertService,
    private alertsListService: AlertsListService) {
      // get alerts from observable alerts service
      this.subscription = this.alertsListService.getAlertList().subscribe(alertList => {
        if (alertList) {
          this.alerts = alertList;
        } else {
          this.alerts = [];
        }
      });
  }

  ngOnInit(): void {
    this.getAlerts();
  }

  // setSelectedAsset(alert: Alert) {
  //   this.selectedAlert = alert;
  // }

  // onSelect(alert: Alert): void {
  //   console.log(this.selectedAlert);
  //   this.selectedAlert = alert;
  // }

  // deleteUserAsset(alert: Alert) {
  //   this.alerts = this.alerts.filter(x => x !== alert);
  //   this.alertService.deleteAlert(alert.id).subscribe();
  // }

  getAlerts(): void {
    this.alertService.getAlerts().subscribe(
      alerts => this.alertsListService.sendAlertList(alerts)
    );
  }

  deleteAlert(alert: Alert) {
    // this.alerts = this.alerts.filter(a => a !== alert);
    this.alertService.deleteAlert(alert.id).subscribe(
      data => this.alertsListService.deleteFromAlertList(alert)
    );
  }

}
