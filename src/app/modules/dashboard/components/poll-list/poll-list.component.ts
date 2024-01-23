import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Poll } from 'src/app/interfaces/poll.interface';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css'],
})
export class PollListComponent {
  pollList: Poll[] = [];
  myPolls: FormGroup = this.formBuilder.group({});
  pollControlName = 'IdControl';
  pollID: string = '';
  constructor(
    private pollservice: PollService,
    private formBuilder: FormBuilder,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    this.pollservice.getAllPolls().subscribe((polls: Poll[]) => {
      if (polls) {
        this.pollList = polls;
        this.buildForm();
      }
    });
  }

  buildForm() {
    this.myPolls.addControl(
      this.pollControlName,
      this.formBuilder.control(null, [Validators.required])
    );
  }

  sendPoll() {
    const infoMyPoll = this.myPolls.value;
    //console.log('Mi encuesta', infoMyPoll);
    this.pollID = infoMyPoll.IdControl;
    //console.log('id Mi encuesta', this.pollID);
    this.pollService.sendPoll(this.pollID);
    localStorage.setItem('PollID', this.pollID);
    //console.log('send poll Mi encuesta');
  }
}
