import { AccountService } from './../_services/account.service';
import { FamilyService } from './../_services/family.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseService } from '../_services/purchase.service';
import { Purchase } from '../_models/purchase';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Family, FamilyResponse } from '../_models';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['date', 'title', 'category', 'purchaser', 'amount'];
  purchases: Purchase[] = [];

  selectedDate: moment.Moment = moment();
  yearPickerControl: FormControl = new FormControl();

  subscriptions: Subscription[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private familyService: FamilyService,
    private accountService: AccountService
  ) {
    this.yearPickerControl.setValue(this.selectedDate.toDate());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(this.yearPickerControl.valueChanges.subscribe(value => {
      this.selectedDate.year(moment(value).year());
      this.onUpdateDate();
    }
    ))
  }

  ngOnInit(): void {
    this.purchaseService.getPurchasesByMonth(this.selectedDate).subscribe((data) => {
      this.purchases = data;
    });
  }

  onUpdateDate(): void {
    this.purchaseService.getPurchasesByMonth(this.selectedDate).subscribe((data) => {
      this.purchases = data;
    });
  }

  handleSelectedMonth(month: any): void {
    this.selectedDate.month(month.value);
    this.onUpdateDate();
  }

  addFamily(): void {
    const famRes: FamilyResponse = {
      id: null,
      name: 'Miehl',
      members: [
        this.accountService.userValue
      ]
    };
    const family = new Family(famRes);
    this.familyService.addFamily(family).subscribe(data => console.log(data));
    
  }

}
