import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public formProfile!: FormGroup;
  public user!: User;
  public imageUpload?: File;
  public imgTemp?: ArrayBuffer | string;

  constructor(private fb: FormBuilder,
            private userSV: UserService,
            private fileUploadSV: FileUploadService) { 
              this.user = userSV.user;
  }

  ngOnInit(): void {
    this.formProfile = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    })
  }

  updateProfile() {
    this.userSV.updateProfile( this.formProfile.value )
          .subscribe(() => {
            const { name, email } = this.formProfile.value;
            this.user.name = name;
            this.user.email = email;

            Swal.fire('Save', 'Changes were made', 'success')
          }, (err) => {
            Swal.fire('Error', err.error.msg, 'error')
          })
  }

  changeImage(target: any) {
    const file = target.files[0]

    this.imageUpload = file;

    if (!file) {
      
      this.imgTemp = undefined;
      return; 
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result || undefined;
    }
  }

  uploadImage() {
    this.fileUploadSV.updatePhoto(this.imageUpload!, 'users', this.user.uid! )
      .then(img => {
        this.user.img = img.toString()
        if (img) {
          Swal.fire('Save', 'Image changed with succes', 'success')
        }
      }).catch(err => Swal.fire('Error', 'It can be upload the image', 'error'))
  }

}
