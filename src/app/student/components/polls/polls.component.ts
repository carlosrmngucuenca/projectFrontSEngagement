import { Component, OnInit } from '@angular/core';
import { PollsService } from 'src/app/services/polls.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
})
export class PollsComponent implements OnInit {
  constructor(private pollService: PollsService) {}

  ngOnInit(): void {
    this.pollService.getAllPolls().subscribe((data) => {
      console.log(data);
    });
  }
}
