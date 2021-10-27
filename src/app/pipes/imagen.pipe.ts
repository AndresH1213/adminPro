import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined, type: 'users' | 'hospitals' | 'doctors' ): string {
      if (!img) {
        return `${base_url}/upload/users/no-image`;
    } else if (img?.includes('https')) {
        console.log(img)
        return img;
    } else {
        return `${base_url}/upload/${type}/${img}`;
    } 
  }

}
