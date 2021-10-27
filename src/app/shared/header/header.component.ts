import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user!: User;

  constructor(private userSV: UserService,
              private router: Router) { 
    this.user = userSV.getUser;
  }

  logout() {
    this.userSV.logout();
  }

  searchTotal(term: string = '') {

    if (term.trim().length === 0) {
      return;
    }
    this.router.navigateByUrl(`dashboard/search/${term}`)
  }
}
