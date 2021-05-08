import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Purchase } from '../_models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor() { }

  currentId = 1;

  purchasesByMonth: any[] = [
    { year: moment().year(), month: moment().month(), purchases: [{id:0 , title: 'Hofer Einkauf', purchaser: 'Bernhard', purchaseDate: moment().month(2).toDate(), amount: 20.50 }]}
  ];

  addPurchase(purchase: Purchase) {
    const foundMonth = this.purchasesByMonth.find( month => month.month == purchase.purchaseDate.getMonth() && month.year == purchase.purchaseDate.getFullYear());
      if(foundMonth) {
        
        const foundPurchase = foundMonth.purchases.find( (purchaseElem: { id: number; }) => purchaseElem.id == purchase.id);
        
        if(foundPurchase === undefined) {
          foundMonth.purchases.push(purchase);
        }
        
      } else {
        this.purchasesByMonth.push({'month' : purchase.purchaseDate.getMonth(), 'year': purchase.purchaseDate.getFullYear(), 'purchases': [purchase]})
      }
    this.currentId ++;
  }

  getPurchases(): Purchase[] {
    return this.purchasesByMonth;
  }

  getPurchasesByMonth(selectedDate: moment.Moment): Purchase[] {
    
    const foundMonth = this.purchasesByMonth.find( purchases => purchases.month == selectedDate.month() && purchases.year == selectedDate.year());

    if(foundMonth == undefined) {
      return [];
    }
    
    return foundMonth.purchases; 
  }

  getNewPurchase(): Purchase {
    return {id:this.currentId , title: '', purchaser: '', purchaseDate: moment().toDate(), amount: 0.0 }
  }

  getSummaryOfPurchasesByMonth(selectedDate: moment.Moment): any {
    console.log(this.purchasesByMonth);
    
    let summary: any[] = [{user: 'Full expenditure', amount: 0}];
    const foundMonth = this.purchasesByMonth.find( purchases => purchases.month == selectedDate.month() && purchases.year == selectedDate.year());
    if(foundMonth == undefined) return 0;

    // { 'user': 'Nicole', 'amount' : 100 }
    foundMonth.purchases.forEach( (purchase: any) => {
      let userSummary = summary.find(entry => entry.user == purchase.purchaser);
      
      if(userSummary != undefined) {
        userSummary.amount += purchase.amount;
      } else {
        summary.push({user: purchase.purchaser, amount: purchase.amount});
      }

      summary[0].amount += purchase.amount;

    });
    return summary;
  }
}
