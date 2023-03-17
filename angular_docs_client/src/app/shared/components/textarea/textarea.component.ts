import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor{

  // 입력한 값
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
