import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-progress-bar',
  templateUrl: './student-progress-bar.component.html',
  styleUrls: ['./student-progress-bar.component.css'],
})
export class StudentProgressBarComponent {
  @Input() textButton = '';
  @Input() imageUrl = '';
  @Input() altImg = '';
}
