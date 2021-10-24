import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Andres', [ Validators.required, Validators.minLength(3) ] ],
    email: ['test@tes.con', [Validators.required, Validators.email] ],
    password: ['12345', Validators.required ],
    password2: ['12345', Validators.required ],
    terms: [true, Validators.required]
  }, {
    validators: this.equalPasswords('password','password2')
  });
  
  constructor(private fb: FormBuilder,
              private userSv: UserService,
              private router: Router ) { }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid){
      return;
    } 

    // Make post
    this.userSv.createUser(this.registerForm.value)
               .subscribe(resp => {
                 // navigate dashboard
                this.router.navigateByUrl('/dashboard');
               }, (err) => {
                 // handling error
                 Swal.fire('Error', err.error.msg, 'error');
                 console.warn(err.error)
                });
  }

  unvalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted){
      return true;
    }
    return false;
  }

  passwordInvalid() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ((pass1 !== pass2 && this.formSubmitted)) {
      return true
    } else {
      return false
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  equalPasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup)=> {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({noEqual: true})
      }
    }
  }

}
