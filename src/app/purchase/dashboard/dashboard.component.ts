import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  public selectedDate: moment.Moment = moment();
  public yearPickerControl: FormControl = new FormControl();
  public isLoading = true;
  public dateSubject: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

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
      this.selectedDate.year(moment(value).year());
      this.getPurchases();
      this.dateSubject.next(this.selectedDate);
    }
    ));
  }

  getPurchases(): void {
    this.isLoading = true;
    this.purchaseService.getPurchasesByMonth(this.selectedDate).subscribe((data) => {
      this.purchases = data;
      console.log(data);
      
      this.isLoading = false;
    });
  }

}
