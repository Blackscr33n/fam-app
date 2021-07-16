import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { PurchaseService } from 'src/app/_services/purchase.service';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent implements OnInit, OnChanges {
  @Input() selectedDate: moment.Moment = moment();
  summary;
  pieChartData;
  view: [number, number] = [window.innerWidth, 300];

  public gradient = true;
  public showLegend = false;
  public showLabels = true;
  public isDoughnut = false;
  public legendPosition: LegendPosition = LegendPosition.Below;

  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private purchaseService: PurchaseService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedDate.previousValue !== undefined &&
      (changes.selectedDate.currentValue.year() !== changes.selectedDate.previousValue.year()
        ||
        changes.selectedDate.currentValue.month() !== changes.selectedDate.previousValue.month()
      )
    ) {

      this.purchaseService.getSummaryOfPurchasesByMonth(this.selectedDate).subscribe((summary) => {
        this.summary = summary;
        this.pieChartData = this.purchaseService.getPieChartData(this.summary.userExpenses);

      });

    }
  }

  async ngOnInit(): Promise<void> {
    this.summary = await this.purchaseService.getSummaryOfPurchasesByMonth(this.selectedDate);
    this.pieChartData = this.purchaseService.getPieChartData(this.summary.userExpenses);
  }

  onSelect(data): void {
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }
}
