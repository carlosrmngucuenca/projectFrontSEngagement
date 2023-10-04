import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-button-pages',
  templateUrl: './button-pages.component.html',
  styleUrls: ['./button-pages.component.css']
})
export class ButtonPagesComponent {
  @Input() displayText: string ="Título por defecto";
}
