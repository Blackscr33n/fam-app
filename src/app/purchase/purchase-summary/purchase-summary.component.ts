import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { PurchaseService } from 'src/app/_services/purchase.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public isCategory = false;
  @Input() public selectedDate: moment.Moment = moment();

  public summary;
  public pieChartData;
  public view: [number, number] = [window.innerWidth, 300];
  public gradient = true;
  public showLegend = false;
  public showLabels = true;
  public isDoughnut = false;
  public legendPosition: LegendPosition = LegendPosition.Below;
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private subscriptions: Subscription[] = [];

  constructor(private purchaseService: PurchaseService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (
      changes.selectedDate.previousValue !== undefined &&
      (changes.selectedDate.currentValue.year() !== changes.selectedDate.previousValue.year()
        ||
        changes.selectedDate.currentValue.month() !== changes.selectedDate.previousValue.month()
      )
    ) {
      this.getSummary();
    }
  }

  ngOnInit(): void {
    this.getSummary();
  }

  private getSummary(): void {
    if (this.isCategory) {
      this.subscriptions.push(
        this.purchaseService.getSummaryOfCategoriesByMonth(this.selectedDate)
          .subscribe((summary) => {
            this.summary = summary;
            if (this.summary.categoryExpenses) {
              this.pieChartData = this.purchaseService.getCategoryPieChartData(this.summary.categoryExpenses);
            }
          })
      );
    } else {
      this.subscriptions.push(
        this.purchaseService.getSummaryOfPurchasesByMonth(this.selectedDate)
          .subscribe((summary) => {
            this.summary = summary;
            if (this.summary.userExpenses) {
              this.pieChartData = this.purchaseService.getPieChartData(this.summary.userExpenses);
            }
          })
      );
    }
  }

  onSelect(data): void {
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }
}
