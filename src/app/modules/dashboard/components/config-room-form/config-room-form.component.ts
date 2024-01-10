import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/interfaces/room.interface';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'config-room-form',
  templateUrl: './config-room-form.component.html',
  styleUrls: ['./config-room-form.component.css'],
})
export class ConfigRoomFormComponent {
  myFormRoom: FormGroup = this.formBuilder.group({});
  newCode: string = 'mpFX';
  newRoomId: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService
  ) {
    this.builForm();
  } // TODO: inject service

  private builForm() {
    this.myFormRoom = this.formBuilder.group({
      roomName: ['test', [Validators.required, Validators.maxLength(10)]],
    });
  }

  get isRoomNameValid() {
    return (
      this.myFormRoom.get('roomName')?.valid &&
      this.myFormRoom.get('roomName')?.touched
    );
  }

  get isRoomNameInvalid() {
    return (
      this.myFormRoom.get('roomName')?.invalid &&
      this.myFormRoom.get('roomName')?.touched
    );
  }

  createRoom() {
    if (this.myFormRoom.valid) {
      const newRoom = this.myFormRoom.get('roomName')?.value;
      this.roomService.createRoom(newRoom).subscribe((response: Room) => {
        console.log('Nueva sala creada con exito', response);
        this.newCode = response.code;
        this.newRoomId = response._id;
      });

      this.roomService.setRoomId(this.newRoomId);
    }
  }
}
