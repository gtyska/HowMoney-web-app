import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TotalAssetValueService {

  private totalValue = new Subject<any>();

    sendValue(value: number) {
      value = Number(value.toFixed(2));
      this.totalValue.next(value);
      console.log("Total value caneged to:", value);
    }

    getValue(): Observable<any> {
        return this.totalValue.asObservable();
    }
}
