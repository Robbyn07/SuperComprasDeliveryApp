import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Inicio', url: '/folder/Inbox', icon: 'home-outline' },
    { title: 'Cuenta', url: '/folder/Inbox', icon: 'person-outline' },
    { title: 'Historial', url: '/folder/Inbox', icon: 'time-outline' },
    { title: 'Ayuda', url: '/folder/Inbox', icon: 'help-circle-outline' },
  ];

  constructor() {
  }
  
}
