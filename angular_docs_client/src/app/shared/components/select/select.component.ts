import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor{

  @Input()
  options!: any[];

  @Input()
  optionValueField!: any;

  @Input()
  optionTextField!: string;

  @Input()
  defaultOption!: "N";
  
  @Input() 
  selectedOption!: string;

  @Output() 
  selectedOptionChange: EventEmitter<string> = new EventEmitter<string>();

  onChange: any = () => { };
  
  onTouched: any = () => { };

  constructor() {
    switch(this.defaultOption) {
      case "N" :
        this.options.push({value: "", text: "없음"});
        break;
    }
  }

  onSelectOption(selectedOption: any) {
    this.selectedOption = selectedOption;
    this.onChange(selectedOption);
    this.onTouched();
    this.selectedOptionChange.emit(this.selectedOption)
  }

  writeValue(selectedOption: any) {
    this.selectedOption = selectedOption;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // onSelectOption(option: any): void {
  //   this.selectedOption = option
  //   this.selectedOptionChange.emit(option.value);
  // }

}
