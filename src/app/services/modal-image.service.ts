import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  constructor() { }

  private _hiddenModal: boolean = true;
  public id?: string;
  public type?: 'users' | 'doctors' | 'hospitals';
  public img?: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hiddenModal() {
    return this._hiddenModal;
  }

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-image'
  ) {
    this.type = type;
    this.id = id;
    this.img = img;
    this._hiddenModal = false;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${type}/${img}`;
    }
  }

  closeModal() {
    this._hiddenModal = true;
  }

}
