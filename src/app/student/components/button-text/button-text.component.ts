import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'student-button-text',
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.css'],
})
export class ButtonTextComponent {
  @Input() textButton = '';
  @Input() isButtonEnabled: boolean = true; // Propiedad para habilitar/deshabilitar el botón
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (this.isButtonEnabled) {
      this.buttonClick.emit();
    }
  }
}
