import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {

  @Output() selectedMonth: EventEmitter<number> = new EventEmitter<number>();
  public monthControl = new FormControl(moment().month());

  public months: any[] = [];

  constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.translate.get('months').subscribe((data:any)=> {
      this.months = [
        { label: data.jan, value: 0 },
        { label: data.feb, value: 1 },
        { label: data.mar, value: 2 },
        { label: data.apr, value: 3 },
        { label: data.may, value: 4 },
        { label: data.jun, value: 5 },
        { label: data.jul, value: 6 },
        { label: data.aug, value: 7 },
        { label: data.sep, value: 8 },
        { label: data.oct, value: 9 },
        { label: data.nov, value: 10 },
        { label: data.dec, value: 11 },
      ]
     });
    
  }

  handleClick(month: any): void {
    this.monthControl.setValue(month.value);
    this.selectedMonth.emit(month.value);
  }

}
