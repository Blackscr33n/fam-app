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
  displayedColumns: string[] = ['date', 'title', 'purchaser', 'amount'];
  purchases: Purchase[] = [];

  selectedDate: moment.Moment = moment();

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.getPurchasesByMonth(this.selectedDate).subscribe((data) => {
      this.purchases = data;
    });
  }

  onUpdateMonth(): void {
    this.purchaseService.getPurchasesByMonth(this.selectedDate).subscribe((data) => {
      this.purchases = data;
    });
  }

  onUpdateYear(year: Event): void {
    console.log(year);
    
  }

}
