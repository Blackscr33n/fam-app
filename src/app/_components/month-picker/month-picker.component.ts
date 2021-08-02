import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import * as moment from 'moment';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements AfterViewInit {

  @Output() selectedMonth: EventEmitter<number> = new EventEmitter<number>();
  public monthControl = new FormControl({ label: moment().format('MMM'), value: moment().month() });

  public months: any[] = [
    { label: "Jan.", value: 0 },
    { label: "Feb.", value: 1 },
    { label: "Mär.", value: 2 },
    { label: "Apr.", value: 3 },
    { label: "Mai", value: 4 },
    { label: "Juni", value: 5 },
    { label: "Juli", value: 6 },
    { label: "Aug.", value: 7 },
    { label: "Sep.", value: 8 },
    { label: "Okt.", value: 9 },
    { label: "Nov.", value: 10 },
    { label: "Dez.", value: 11 },
  ];

  @ViewChild('chipList') chipList: MatChipList;

  constructor() {
    //this.monthControl.setValue();
  }

  ngAfterViewInit(): void {
    this.chipList.writeValue('initiated');
  }

  handleClick(month: any) {
    this.monthControl.setValue(month);
    this.selectedMonth.emit(month);
  }

}
