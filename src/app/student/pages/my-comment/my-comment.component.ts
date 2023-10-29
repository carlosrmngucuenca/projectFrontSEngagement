import { Component } from '@angular/core';

@Component({
  selector: 'app-my-comment',
  templateUrl: './my-comment.component.html',
  styleUrls: ['./my-comment.component.css']
})
export class MyCommentComponent {
  submitComment(){
    console.log('submit comment');
  }
}
