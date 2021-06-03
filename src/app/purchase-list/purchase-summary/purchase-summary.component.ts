import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { PurchaseService } from 'src/app/_services/purchase.service';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent implements OnInit, OnChanges {
  @Input() selectedDate: moment.Moment = moment();
  summary: any = 0.00;

  constructor(private purchaseService: PurchaseService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(
      changes.selectedDate.previousValue != undefined &&
      (changes.selectedDate.currentValue.year() != changes.selectedDate.previousValue.year()
    ||
    changes.selectedDate.currentValue.month() != changes.selectedDate.previousValue.month()
      )
      ) {
        this.summary = this.purchaseService.getSummaryOfPurchasesByMonth(this.selectedDate);
      }
  }

  ngOnInit(): void {
    this.summary = this.purchaseService.getSummaryOfPurchasesByMonth(this.selectedDate);
    console.log(this.summary);
  }
}
