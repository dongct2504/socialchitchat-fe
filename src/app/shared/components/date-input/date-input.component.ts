import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() maxDate?: Date;

  bsConfig?: Partial<BsDatepickerConfig>;

  constructor(@Self() private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-green',
      dateInputFormat: 'DD/MM/YYYY',
      isAnimated: true
    };
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
