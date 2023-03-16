import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor{

  value!: string;
  
  private onChangeCallback: (_: any) => void = () => {};
  
  private onTouchedCallback: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // disable or enable the input element
  }

  onChange(event: any) {
    this.value = event.target.value
    this.onChangeCallback(this.value);

  }

  onTouched() {
    this.onTouchedCallback();
  }

}
