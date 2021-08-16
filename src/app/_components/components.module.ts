import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { AlertComponent } from './alert/alert.component';
import { MaterialModule } from '../_helpers/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      YearPickerComponent,
      MonthPickerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    YearPickerComponent,
    MonthPickerComponent
  ]
})
export class ComponentsModule { }
