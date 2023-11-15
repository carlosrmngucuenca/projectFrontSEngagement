import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'student-button-text',
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.css'],
})
export class ButtonTextComponent {
  @Input() textButton = '';
  @Input() isAnswered: boolean = true;
  @Input() isButtonEnabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();
}
