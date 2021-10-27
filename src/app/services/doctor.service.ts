import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Doctor } from '../models/doctor.model';
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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

  loadDoctors() {
    const url = `${base_url}/doctors`;
    return this.http.get(url, this.headers).pipe(
      map<any,Doctor[]>( resp => resp.doctors)
    )
  }

  createDoctor(doctor: { name: string, hospital: string}) {
    const url = `${base_url}/doctors`;
    
    return this.http.post(url, doctor ,this.headers);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${base_url}/doctors/${doctor._id}`;
    
    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(id: string) {
    const url = `${base_url}/doctors/${id}`;
    
    return this.http.delete(url, this.headers);
  }

  getDoctorById(id: string) {
    const url = `${base_url}/doctors/${id}`;
    return this.http.get(url, this.headers).pipe(
      map<any,Doctor>( resp => resp.doctor),
      catchError(err => of(undefined))
    )
  }

}
