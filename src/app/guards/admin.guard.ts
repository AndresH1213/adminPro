import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userSV:UserService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      // return (this.userSV.role === 'ADMIN_ROLE') ? true: false;
      if (this.userSV.role === 'ADMIN_ROLE') {
        return true
      } else {
        this.router.navigateByUrl('/dashboard');
        return false;
      }
  }
  
}
