import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements AfterViewInit {
  public monthControl = new FormControl();

  public months: any[] = [
    { label: "Jan.", value: 1 },
    { label: "Feb.", value: 2 },
    { label: "Mär.", value: 3 },
    { label: "Apr.", value: 4 },
    { label: "Mai", value: 5 },
    { label: "Juni", value: 6 },
    { label: "Juli", value: 7 },
    { label: "Aug.", value: 8 },
    { label: "Sep.", value: 9 },
    { label: "Okt.", value: 10 },
    { label: "Nov.", value: 11 },
    { label: "Dez.", value: 12 },
  ];

  @ViewChild('chipList') chipList: MatChipList;

  constructor() { }

  ngAfterViewInit(): void {
    
    this.monthControl.setValue({ label: "Juli", value: 7 });
    this.chipList.writeValue('initiated');
  }

  handleClick(month: any) {
    this.monthControl.setValue(month);
  }

}
