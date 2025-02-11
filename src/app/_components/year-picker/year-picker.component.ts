import {
    AfterViewInit,
    Component,
    forwardRef,
    Input,
    ViewChild,
  } from '@angular/core';
import {
    ControlValueAccessor,
    UntypedFormControl,
    NG_VALUE_ACCESSOR,
  } from '@angular/forms';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
  } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

  // import { MultiDatepickerComponent } from '../multidatepicker.component';

  // Depending on whether rollup is used, moment needs to be imported differently.
  // Since Moment.js doesn't have a default export, we normally need to import using the `* as`
  // syntax. However, rollup creates a synthetic default module and we thus need to import it using
  // the `default as` syntax.
import * as moment from 'moment';
  // tslint:disable-next-line:no-duplicate-imports
  // import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';

export const YEAR_MODE_FORMATS = {
    parse: {
      dateInput: 'YYYY',
    },
    display: {
      dateInput: 'YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

@Component({
    selector: 'app-year-picker',
    templateUrl: './year-picker.component.html',
    styleUrls: [],
    providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'de' },
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE],
      },
      { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => YearPickerComponent),
        multi: true,
      },
    ],
  })
  export class YearPickerComponent
    implements ControlValueAccessor, AfterViewInit {
    /** custom form-field class */
    @Input() jpCustomFormFieldClass = '';

    /** Component label */
    @Input() label = '';

    _max: moment.Moment;
    @Input()
    get max(): number | Date {
      return this._max ? this._max.year() : undefined;
    }
    set max(max: number | Date) {
      if (max) {
        const momentDate =
          typeof max === 'number' ? moment([max, 0, 1]) : moment(max);
        this._max = momentDate.isValid() ? momentDate : undefined;
      }
    }

    _min: moment.Moment;
    @Input()
    get min(): number | Date {
      return this._min ? this._min.year() : undefined;
    }
    set min(min: number | Date) {
      if (min) {
        const momentDate =
          typeof min === 'number' ? moment([min, 0, 1]) : moment(min);
        this._min = momentDate.isValid() ? momentDate : undefined;
      }
    }

    @Input() touchUi = false;

    @ViewChild(MatDatepicker) _picker: MatDatepicker<moment.Moment>;

    _inputCtrl: UntypedFormControl = new UntypedFormControl();

    // Function to call when the date changes.
    onChange = (year: Date) => { };

    // Function to call when the input is touched (when a star is clicked).
    onTouched = () => { };

    /** send the focus away from the input so it doesn't open again */
    _takeFocusAway = (datepicker: MatDatepicker<moment.Moment>) => { };

    constructor() {
      this.max = moment().year();
    }// private parent: MultiDatepickerComponent

    ngAfterViewInit(): void {
      // this._takeFocusAway = this.parent._takeFocusAway;
    }

    writeValue(date: Date): void {
      if (date && this._isYearEnabled(date.getFullYear())) {
        const momentDate = moment(date);
        if (momentDate.isValid()) {
          momentDate.set({ date: 1 });
          this._inputCtrl.setValue(moment(date), { emitEvent: false });
        }

      }
    }
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    // Allows Angular to disable the input.
    setDisabledState(isDisabled: boolean): void {
      isDisabled
        ? (this._picker.disabled = true)
        : (this._picker.disabled = false);

      isDisabled ? this._inputCtrl.disable() : this._inputCtrl.enable();
    }

    _yearSelectedHandler(chosenDate: moment.Moment, datepicker: MatDatepicker<moment.Moment>): void {
      datepicker.close();

      if (!this._isYearEnabled(chosenDate.year())) {
        return;
      }

      chosenDate.set({ date: 1 });

      this._inputCtrl.setValue(chosenDate, { emitEvent: false });
      this.onChange(chosenDate.toDate());
      this.onTouched();
    }

    _openDatepickerOnClick(datepicker: MatDatepicker<moment.Moment>): void {
      if (!datepicker.opened) {
        datepicker.open();
      }
    }

    /** Whether the given year is enabled. */
    private _isYearEnabled(year: number): boolean {
      // disable if the year is greater than maxDate lower than minDate
      if (
        year === undefined ||
        year === null ||
        (this._max && year > this._max.year()) ||
        (this._min && year < this._min.year())
      ) {
        return false;
      }

      return true;
    }
  }
