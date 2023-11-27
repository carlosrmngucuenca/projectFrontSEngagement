import { Component, OnInit } from '@angular/core';
import { ScreenService } from './services/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'studentFront';
  constructor(private screenService: ScreenService) {}
  ngOnInit() {
    // Llama al servicio para mantener la pantalla activa
    this.keepScreenOn();
  }
  ngOnDestroy() {
    this.screenService.disableKeepAwake(); // Desactiva mantener la pantalla activa al salir del componente
  }
  keepScreenOn() {
    this.disableScreenOn();
  }
  disableScreenOn() {
    this.screenService.disableKeepAwake();
  }
}
