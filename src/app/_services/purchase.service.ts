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
    var res = await this.apollo.mutate({
            mutation: addPurchaseMutation
        }).toPromise();
        
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
    

    return await res.data['purchasesByMonth'] as Purchase[]; 
  }

  getNewPurchase(): Purchase {
    return {id: 0 , title: '', purchaser: '', purchaseDate: moment().toDate(), amount: 0.0 }
  }

  
  async getSummaryOfPurchasesByMonth(selectedDate: moment.Moment): Promise<any> {
    
    const dateString = selectedDate.format("YYYY-MM");
    const monthlyExpenses = gql`
      query calculateMonthlyExpenses {
        calculateMonthlyExpenses(purchaseMonth: "${dateString}")
        {
          month
          totalExpenses
          userExpenses 
          {
            purchaser {
              firstname
              lastname
              id
            }
            amount
            month
          }
          owes
          {
            debtor {
              firstname
              lastname
              id
            }
            creditor {
              firstname
              lastname
              id
            }
            amount
          }
        }
      }
    `
    const res = await this.apollo.watchQuery<any>({
      query: monthlyExpenses,
      context: {
          headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      },
      fetchPolicy: 'network-only'
    }).result();

    return await res.data['calculateMonthlyExpenses']; 

  }

  getPieChartData(data: any[]) {
    let pieChartData = [];

    data.forEach(elem => {
      pieChartData.push({
        name: elem.purchaser.firstname,
        value: elem.amount
      });
    });
    return pieChartData;
  }
}
