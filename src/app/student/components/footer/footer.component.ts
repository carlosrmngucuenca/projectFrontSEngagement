import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SumService } from 'src/app/services/sum.service';
@Component({
  selector: 'student-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private sumService: SumService, private router: Router) {}

  handlerButtonSendDoubts() {
    this.sumService.addValuePointsDoubts();
    this.router.navigateByUrl('/student/my-doubt');
  }
}
