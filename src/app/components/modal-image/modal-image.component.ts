import { Component, OnInit } from '@angular/core';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public hiddenModal: boolean = false;
  public imageUpload?: File;
  public imgTemp?: ArrayBuffer | string;

  constructor(public modal: ModalImageService,
              public fileUploadSV: FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = undefined;
    this.modal.closeModal()
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

    const id = this.modal.id;
    const type = this.modal.type

    this.fileUploadSV.updatePhoto(this.imageUpload!, type!, id!)
      .then((img:any) => {
        if (img) {
          Swal.fire('Save', 'Image changed with succes', 'success');
          this.modal.newImage.emit(img);

          this.closeModal();
        }
      }).catch(err => Swal.fire('Error', 'It can be upload the image', 'error'))
  }


}
