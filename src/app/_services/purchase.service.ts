import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Purchase } from '../_models/purchase';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private apollo: Apollo) { }

  purchasesByMonth: any[] = [];

  async addPurchase(purchase: Purchase) {
    console.log(purchase);
    
    const addPurchaseMutation = gql`
      mutation addPurchase {
        addPurchase(
          title: "${purchase.title}"
          amount: ${purchase.amount}
          purchaseDate: "${moment(purchase.purchaseDate).format('YYYY-MM-DD')}"
          purchaseMonth: "${moment(purchase.purchaseDate).format('YYYY-MM')}"
          purchaser: "${purchase.purchaser}"
        )
        {
          id, amount, title, purchaseDate, purchaser {
          email}, family, {name}}
      }
    `;
      console.log("mutation: ", addPurchaseMutation);
    var res = await this.apollo.mutate({
            mutation: addPurchaseMutation
        }).toPromise();
        console.log('addPurchaseRes: ', res);
        
        return res.data['purchase'];
    
  }

  getPurchases(): any {
  }

  async getPurchasesByMonth(selectedDate: moment.Moment): Promise<Purchase[]> {
    const dateString = selectedDate.format("YYYY-MM");
    const purchaseByMonthQuery = gql`
      query purchasesByMonth {
        purchasesByMonth(purchaseMonth: "${dateString}") {
          title
          amount
          purchaseDate
          purchaseMonth
          purchaser {
            firstname
            lastname
          }
        }
      }
    `
    const res = await this.apollo.watchQuery<any>({
            query: purchaseByMonthQuery,
            context: {
                headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            },
            fetchPolicy: 'network-only'
        }).result();
    this.purchasesByMonth = res.data['purchasesByMonth'];
    
    console.log('resData: ', res.data);

    return await res.data['purchasesByMonth'] as Purchase[]; 
  }

  getNewPurchase(): Purchase {
    return {id: 0 , title: '', purchaser: '', purchaseDate: moment().toDate(), amount: 0.0 }
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
