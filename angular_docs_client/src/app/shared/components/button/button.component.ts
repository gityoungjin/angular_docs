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
  click: EventEmitter<any> = new EventEmitter();

  clickButton() {
    this.click.emit();
  }

}
