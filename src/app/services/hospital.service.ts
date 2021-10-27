import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }
  
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

  loadHospitals() {
    const url = `${base_url}/hospitals`;
    
    return this.http.get(url, this.headers).pipe(
      map<any, Hospital[]>( (resp: {ok: boolean, hospitals: Hospital[]}) => resp.hospitals )
    )
  }

  createHospital(name: string) {
    const url = `${base_url}/hospitals`;
    
    return this.http.post(url,{name} ,this.headers);
  }

  updateHospital(id: string, name: string) {
    const url = `${base_url}/hospitals/${id}`;
    
    return this.http.put(url,{ name } ,this.headers);
  }

  deleteHospital(id: string) {
    const url = `${base_url}/hospitals/${id}`;
    
    return this.http.delete(url,this.headers);
  }

}
