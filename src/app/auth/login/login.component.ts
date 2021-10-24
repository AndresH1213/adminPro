import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group(
    {
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    }
  );

  constructor(private router: Router,
              private fb: FormBuilder,
              private userSv: UserService,
              private ngZone: NgZone) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    this.userSv.loginUser(this.loginForm.value)
               .subscribe(resp => {
                 if ( this.loginForm.get('remember')?.value ) {
                   localStorage.setItem('email', this.loginForm.get('email')?.value)
                 } else {
                   localStorage.removeItem('email');
                 }
                 // navigate dashboard
                this.router.navigateByUrl('/dashboard');
               }, (err) => {
                 Swal.fire('Error', err.error.msg, 'error')
               })
  }

  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp()
  }

  async startApp () {
    
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    await this.userSv.googleInit();
    this.auth2 = this.userSv.auth2;
    
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element: any) {

    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.userSv.loginGoogle(id_token).subscribe(succes=> {
            // navigate dashboard
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');  
            })
          });

        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
