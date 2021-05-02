import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Purchase } from '../purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor() { }

  currentId = 1;



  purchases: Purchase[] = [
    {id:0 , title: 'Hofer Einkauf', purchaser: 'Bernhard', purchaseDate: moment().month(2).toDate(), amount: 20.50 }
  ];

  purchasesByMonth: any[] = [];


  addPurchase(purchase: Purchase) {
    this.purchases.push(purchase);
    this.currentId ++;
  }

  getPurchases(): Purchase[] {
    return this.purchases;
  }

  sortPurchasesByMonth(): void {
    this.purchases.forEach((purchase) => {
      const foundMonth = this.purchasesByMonth.find( month => month.month == purchase.purchaseDate.getMonth() && month.year == purchase.purchaseDate.getFullYear());
      if(foundMonth) {
        console.log('foundMonth', foundMonth);
        
        const foundPurchase = foundMonth.purchases.find( (purchaseElem: { id: number; }) => purchaseElem.id == purchase.id);
        console.log('foundPurchase', foundPurchase);
        
        if(foundPurchase === undefined) {
          foundMonth.purchases.push(purchase);
        }
        
      } else {
        this.purchasesByMonth.push({'month' : purchase.purchaseDate.getMonth(), 'year': purchase.purchaseDate.getFullYear(), 'purchases': [purchase]})
      }
    })

  }

  getPurchasesByMonth(month?: Number): Purchase[] {
    const foundMonth = this.purchasesByMonth.find( purchases => purchases.month == month);

    if(foundMonth == undefined) {
      return [];
    }
    return foundMonth.purchases;
  }

  getNewPurchase(): Purchase {
    return {id:this.currentId , title: '', purchaser: '', purchaseDate: moment().toDate(), amount: 0.0 }
  }
}
