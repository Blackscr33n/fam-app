import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseService } from '../../_services/purchase.service';
import { Purchase } from '../../_models/purchase';
import dayjs from 'dayjs';
import { UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements AfterViewInit, OnDestroy, OnInit {
  public displayedColumns: string[] = ['date', 'title', 'category', 'purchaser', 'amount'];
  public purchases: Purchase[] = [];
  public selectedDate: dayjs.Dayjs = dayjs();
  public yearPickerControl: UntypedFormControl = new UntypedFormControl();
  public isLoading = true;
  public dateSubject: BehaviorSubject<dayjs.Dayjs> = new BehaviorSubject(dayjs());

  private subscriptions: Subscription[] = [];


  constructor(
    private purchaseService: PurchaseService,
    private changeDetectorRef: ChangeDetectorRef
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

  handleSelectedMonth(month: any): void {
    this.selectedDate.month(month);
    this.dateSubject.next(this.selectedDate);
    this.getPurchases();
  }

}
