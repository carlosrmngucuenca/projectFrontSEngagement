import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-button-text',
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.css']
})
export class ButtonTextComponent {
  @Input() textButton = '';
}
