import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Purchase, PurchaseResponse } from '../_models/purchase';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private apollo: Apollo) { }

  public addPurchase(purchase: Purchase): Observable<Purchase> {

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
    return this.apollo.mutate({
      mutation: addPurchaseMutation
    }).pipe(
      map((response: any) => response.data.purchase),
      map(response => response.map((item: PurchaseResponse) => new Purchase(item)))
    );

  }

  public getPurchasesByMonth(selectedDate: moment.Moment): Observable<Purchase[]> {
    const dateString = selectedDate.format('YYYY-MM');
    const purchaseByMonthQuery = gql`
      query purchasesByMonth {
        purchasesByMonth(purchaseMonth: '${dateString}'') {
          id
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
    `;

    return this.apollo.watchQuery<any>({
      query: purchaseByMonthQuery,
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map(response => response.data.purchasesByMonth),
      map(response => response.map((item: PurchaseResponse) => new Purchase(item)
      ))
    );

  }

  public getSummaryOfPurchasesByMonth(selectedDate: moment.Moment): Observable<Purchase[]> {

    const dateString = selectedDate.format('YYYY-MM');
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
    `;

    return this.apollo.watchQuery<any>({
      query: monthlyExpenses,
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map(response => response.data.purchasesByMonth),
      map(response => response.map((item: PurchaseResponse) => new Purchase(item))
      )
    );

  }

  public getPieChartData(data: any[]): any[] {
    const pieChartData = [];

    data.forEach(elem => {
      pieChartData.push({
        name: elem.purchaser.firstname,
        value: elem.amount
      });
    });
    return pieChartData;
  }
}
