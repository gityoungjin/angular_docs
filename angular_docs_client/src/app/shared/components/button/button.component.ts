import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  label!: string;   // 버튼명

  @Output()
  clicked: EventEmitter<any> = new EventEmitter();

  // 부모이벤트 발생
  clickButton(event: any) {
    this.clicked.emit(event);
  }

}
