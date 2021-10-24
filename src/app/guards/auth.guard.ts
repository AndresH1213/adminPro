import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userSV: UserService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      
    return this.userSV.validateToken()
                      .pipe(
                        tap( isAuth => {
                          if (!isAuth) {
                            this.router.navigateByUrl('/login')
                          }
                        } )
                      )
  }
  
}
