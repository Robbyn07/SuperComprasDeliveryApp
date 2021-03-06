import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Inicio', url: '/folder/Inbox', icon: 'home-outline' },
    { title: 'Cuenta', url: '/cuenta-info', icon: 'person-outline' },
    { title: 'Historial', url: '/pedido-historial', icon: 'time-outline' },
    { title: 'Ayuda', url: '/ayuda', icon: 'help-circle-outline' },
  ];

  constructor() {
  }
  
}
