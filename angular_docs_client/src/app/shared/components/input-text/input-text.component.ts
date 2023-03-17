import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  // 
  providers: [
    {
      // "NG_VALUE_ACCESSOR" : Angular에서 제공하는 Injector Token중 하나로 
      // FormControl과 양방향 데이터 바인딩을 할수 있도록 설정
      provide: NG_VALUE_ACCESSOR,
      // 이 컴포넌트가 "ControlValueAccessor"를 구현하고 있으며 참조할 수 있도록 설정
      useExisting: forwardRef(() => InputTextComponent),
      // "NG_VALUE_ACCESSOR" 프로바이더를 구현한 다른 컴포넌트가 있을때 설정한다.
      // false로 설정하면 기존에 구현한 컴포넌트를 덮어씌우게 된다.
      multi: true,
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor{

  value!: string;
  
  private onChangeCallback: (_: any) => void = () => {};
  
  private onTouchedCallback: () => void = () => {};

  // "ControlValueAccessor" > 외부 모델에서 컨트롤 값이 변경될 때 호출되는 메서드로, 컴포넌트의 상태를 업데이트 한다.
  writeValue(value: any): void {
    this.value = value;
  }

  // "ControlValueAccessor" > 컨트롤 값이 변경될 때 Angular에 알리기 위한 콜백 함수를 등록하는 메서드이다.
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  // "ControlValueAccessor" > 컨트롤에 대한 터치 이벤트를 Angular에 알리기 위한 콜백 함수를 등록하는 메소드이다.
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  // "ControlValueAccessor" > 폼컨트롤이 활성화 또는 비활성화 될 때 Angular에 알리기 위한 콜백 함수를 등록하는 메소드이다.
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
