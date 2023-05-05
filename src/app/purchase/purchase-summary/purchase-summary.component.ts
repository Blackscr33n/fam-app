import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as moment from "moment";
import { PurchaseService } from "src/app/_services/purchase.service";
//import { LegendPosition } from "@swimlane/ngx-charts";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
    selector: 'app-purchase-summary',
    templateUrl: './purchase-summary.component.html',
    styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent implements OnInit, OnDestroy {
	@Input() public isCategory = false;
	@Input() public selectedDate: moment.Moment = moment();
	@Input() public dateSubject: BehaviorSubject<moment.Moment>;

	public summary;
	public pieChartData;
	public view: [number, number] = [window.innerWidth - 20, 270];
	public gradient = true;
	public showLegend = false;
	public showLabels = true;
	public isDoughnut = false;
	//public legendPosition: LegendPosition = LegendPosition.Below;
	public colorScheme = "nightLights";

	private subscriptions: Subscription[] = [];

	constructor(private purchaseService: PurchaseService) {}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	ngOnInit(): void {
		this.dateSubject.subscribe((selectedDate) => {
			this.selectedDate = selectedDate;
			this.getSummary();
		});
	}

	private getSummary(): void {
		if (this.isCategory) {
			this.subscriptions.push(
				this.purchaseService
					.getSummaryOfCategoriesByMonth(this.selectedDate)
					.subscribe((summary) => {
						this.summary = summary;
						if (this.summary.categoryExpenses) {
							this.pieChartData = this.purchaseService.getCategoryPieChartData(
								this.summary.categoryExpenses,
							);
						}
					}),
			);
		} else {
			this.subscriptions.push(
				this.purchaseService
					.getSummaryOfPurchasesByMonth(this.selectedDate)
					.subscribe((summary) => {
						this.summary = summary;
						if (this.summary.userExpenses) {
							this.pieChartData = this.purchaseService.getPieChartData(
								this.summary.userExpenses,
							);
						}
					}),
			);
		}
	}

	onSelect(data): void {}

	onActivate(data): void {}

	onDeactivate(data): void {}
}
