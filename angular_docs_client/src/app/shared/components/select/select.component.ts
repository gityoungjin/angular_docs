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

  // option 목록
  @Input()
  options!: any[];

  // option의 value가 될 key|field
  @Input()
  optionValueField!: any;

  // option의 text가 될 key|field
  @Input()
  optionTextField!: string;

  // option중 첫번째 값 ("N" : "없음", "A" : "전체" ... 추가가능)
  @Input()
  defaultOption!: "N" | "A";
  
  // 선택된 option
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

  writeValue(selectedOption: any) {
    this.selectedOption = selectedOption;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onSelectOption(selectedOption: any) {
    this.selectedOption = selectedOption;
    /* 
      ⭐️⭐️⭐️⭐️⭐️중요⭐️⭐️⭐️⭐️⭐️(시발 좆뺑이침)
      [ngValue]로 옵션에 value를 적용하면 angular가 자동으로 
      value앞에 "숫자 : 데이터" 와 같이 "숫자 : "를 추가한다.

      그래서 데이터를 뽑아보면 "숫자 : 데이터"가 뽑히지만
      "ControlValueAccessor"의 registerOnChange함수를 이용해서 콜백메서드를 지정하고
      그 콜백메서드를 이용해서 데이터를 전송하면 "숫자 : "를 제외하고 데이터만 전송한다.

      사실 select뿐만 아니라 input이나 textarea등도 이런식으로 데이터를 콜백함수를 이용해서 구현하는게 바람직하다.
    */
    this.onChange(selectedOption);
    this.onTouched();
    this.selectedOptionChange.emit(this.selectedOption)
  }

}
