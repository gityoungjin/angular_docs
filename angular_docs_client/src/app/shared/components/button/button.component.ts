import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  label!: string;
  @Output()
  clicked: EventEmitter<any> = new EventEmitter();

  clickButton(event: any) {
    this.clicked.emit(event);
  }

}
