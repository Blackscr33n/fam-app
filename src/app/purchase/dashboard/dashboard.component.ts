import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import dayjs from 'dayjs';
import { Purchase } from 'src/app/_models';
import { PurchaseService } from 'src/app/_services/purchase.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public displayedColumns: string[] = ['date', 'title', 'category', 'purchaser', 'amount'];
    public purchases: Purchase[] = [];
    public selectedDate: dayjs.Dayjs = dayjs();
    public yearPickerControl: UntypedFormControl = new UntypedFormControl();
    public isLoading = true;
    public dateSubject: BehaviorSubject<dayjs.Dayjs> = new BehaviorSubject(dayjs());

    private subscriptions: Subscription[] = [];

    constructor(
        private purchaseService: PurchaseService
    ) {
        this.yearPickerControl.setValue(this.selectedDate.toDate());
    }

    ngOnInit(): void {
        this.getPurchases();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngAfterViewInit(): void {
        this.subscriptions.push(this.yearPickerControl.valueChanges.subscribe(value => {
            this.selectedDate.year(dayjs(value).year());
            this.getPurchases();
            this.dateSubject.next(this.selectedDate);
        }
        ));
    }

    getPurchases(): void {
        this.isLoading = true;
        this.purchaseService.getPurchasesByMonth(this.selectedDate).subscribe((data) => {
            this.purchases = data;
            this.isLoading = false;
        });
    }

}
