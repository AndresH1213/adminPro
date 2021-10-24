import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
  }

  googleInit() {
    return new Promise<void>(resolve => {
      console.log('google init')

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '155680275520-hvrjo6ar1pgudokkprtitc4f7nlpvssu.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {

      // ngzona allows that thirdparty execute our own angular commands
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })

    });
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (data:any) => {
        localStorage.setItem('token', data.token);
      }),
      map(data => true),
      catchError(err => of(false))
    )
  }

  createUser (formData: RegisterForm){
    
    return this.http.post(`${base_url}/users`, formData )
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
    
  }
  loginUser (formData: loginForm){
    
    return this.http.post(`${base_url}/login`, formData )
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
  }
  loginGoogle (token: any){
    
    return this.http.post(`${base_url}/login/google`, {token} )
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
  }
}
