import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  view: [number, number] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private purchaseService: PurchaseService) {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if(
      changes.selectedDate.previousValue != undefined &&
      (changes.selectedDate.currentValue.year() != changes.selectedDate.previousValue.year()
    ||
      changes.selectedDate.currentValue.month() != changes.selectedDate.previousValue.month()
      )
      ) {
        this.summary = await this.purchaseService.getSummaryOfPurchasesByMonth(this.selectedDate);
        console.log(this.summary);
        
        this.pieChartData = this.purchaseService.getPieChartData(this.summary.userExpenses);
      }
  }

  async ngOnInit() {
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
