import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-button-image-text',
  templateUrl: './button-image-text.component.html',
  styleUrls: ['./button-image-text.component.css']
})
export class ButtonImageTextComponent {
  @Input() textButton = '';
  @Input() imageUrl = '';
  @Input() altImg = '';
}
