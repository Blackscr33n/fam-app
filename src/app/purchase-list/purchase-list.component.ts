import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../_services/purchase.service';
import { Purchase } from '../purchase';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'amount', 'date', 'purchaser'];
  purchases: Purchase[] = [];

  selectedMonth: Number = 0;
  months: any[] = [ 
    {name:'Jänner', value: 0},
    {name:'Februar', value: 1},
    {name:'März', value: 2},
    {name:'April', value: 3},
    {name:'Mai', value: 4},
    {name:'Juni', value: 5},
    {name:'Juli', value: 6},
    {name:'August', value: 7},
    {name:'September', value: 8},
    {name:'Oktober', value: 9},
    {name:'November', value: 10},
    {name:'Dezember', value: 11},
  ];

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchases = this.purchaseService.getPurchases();
    
  }

  onUpdateMonth() {
    this.purchaseService.sortPurchasesByMonth();
    
    this.purchases = this.purchaseService.getPurchasesByMonth(this.selectedMonth);
  }

}
