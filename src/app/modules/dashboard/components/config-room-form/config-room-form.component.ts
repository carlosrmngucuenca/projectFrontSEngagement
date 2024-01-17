import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/interfaces/room.interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'config-room-form',
  templateUrl: './config-room-form.component.html',
  styleUrls: ['./config-room-form.component.css'],
})
export class ConfigRoomFormComponent {
  isRoomCreated: boolean = false;
  myFormRoom: FormGroup = this.formBuilder.group({});
  newCode: string = '';
  newRoomId: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private dataRealTimeService: DataRealTimeService,
  ) {
    this.builForm();
    this.isRoomJoined();
  }

  private builForm() {
    this.myFormRoom = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.maxLength(10)]],
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
      this.roomService.joinRoom(this.newCode);
      this.isRoomCreated = true;
    }
  }
  exitRoom() {
    this.dataRealTimeService.clearIntervals().subscribe();
    this.isRoomCreated = false;
    this.roomService.leaveRoom(this.newCode);
  }

  isRoomJoined() {
    if(this.roomService.isRoomCreated()){
      this.isRoomCreated = true;
      this.newCode = this.roomService.getRoomCode() || '';
    }
    return ;
  }

}
