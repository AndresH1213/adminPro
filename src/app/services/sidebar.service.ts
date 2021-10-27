import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];
  constructor(private router: Router) { }

  loadMenu() {

    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];

    if (this.menu.length === 0 ) {this.router.navigateByUrl('/login')}
  }

}
