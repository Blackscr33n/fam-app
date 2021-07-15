import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../_services/purchase.service';
import { Purchase } from '../_models/purchase';
import * as moment from 'moment';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'amount', 'date', 'purchaser'];
  purchases: Purchase[] = [];

  selectedDate: moment.Moment = moment();

  constructor(private purchaseService: PurchaseService) { }

  async ngOnInit() {
    this.purchaseService.getPurchasesByMonth(this.selectedDate).subscribe((data) => {
      this.purchases = data;
      console.log(data);
      
    });

  }

  async onUpdateMonth() {
    this.purchaseService.getPurchasesByMonth(this.selectedDate).subscribe((data) => {
      this.purchases = data;
    });
  }

}
