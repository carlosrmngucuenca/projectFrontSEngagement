import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-button-image-text',
  templateUrl: './button-icon-text.component.html',
  styleUrls: ['./button-icon-text.component.css']
})
export class ButtonIconTextComponent {
  @Input() textButton = '';
  @Input() imageUrl = '';
  @Input() altImg = '';
}
