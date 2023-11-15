import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'student-dropdown-options',
  templateUrl: './student-dropdown-options.component.html',
  styleUrls: ['./student-dropdown-options.component.css'],
})
export class StudentDropdownOptionsComponent {
  @Output() optionSelected = new EventEmitter<string>();

  selectOption(option: string) {
    this.optionSelected.emit(option);
  }
}
