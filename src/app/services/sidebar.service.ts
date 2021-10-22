import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/'},
        { title: 'ProgressBar', url: 'progress'},
        { title: 'Chart1', url: 'grafica1'},
        { title: 'Promise', url: 'promise'},
        { title: 'RxJs', url: 'rxjs'},
      ]
    }
  ];

  constructor() { }
}
