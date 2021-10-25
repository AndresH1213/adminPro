import { Component } from '@angular/core';
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

  constructor(private userSV: UserService) { 
    this.user = userSV.getUser;
  }

  logout() {
    this.userSV.logout();
  }
}
