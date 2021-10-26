import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';
import { loadUser } from '../interfaces/load-users.interface';

const base_url = environment.base_url

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user!: User;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
  }

  get getUser() {
    return this.user
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get uid() {
    return this.user.uid || '';
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

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (data:any) => {
        const {
          email,
          google,
          name,
          role,
          img = '',
          uid
        } = data.user;
        this.user = new User(name, email, '', img, google, role, uid);
        localStorage.setItem('token', data.token);

        return true
      }),
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

  updateProfile(data: {email:string, name: string, role?: string } ) {

    data = {
      ...data,
      role: this.user.role
    }

    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers)
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

  loadUser(upto: number = 0) {
    const url = `${base_url}/users?upto=${upto}`;
    return this.http.get<loadUser>(url, this.headers)
            .pipe(
              map(resp => {
                const users = resp.users.map( 
                  user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
                );
                return {
                  total: resp.total,
                  users
                }
              })
            )
  }

  deleteUser( user: User) {
    //users/61737d78b012488168271838
    const url = `${base_url}/users/${user.uid}`;

    return this.http.delete(url, this.headers);
    
  }

  saveUser(user: User) {

    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers)
  }
}
