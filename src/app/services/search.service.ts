import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient) { }

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

  private userTransform( results: any[]): User[] {
    return results.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
    )
  }

  private hospitalTransfor(results: any[]): Hospital[] {
    return results
  }

  private doctorTransfor(results: any[]): Doctor[] {
    return results
  }

  globalSearch(term: string){
    const url = `${base_url}/total/${term}`;
    return this.http.get(url, this.headers);
  }

  search(
    type: 'users' | 'hospitals' | 'doctors',
    term: string
  ) {
    const url = `${base_url}/total/collection/${type}/${term}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any ) => {
        switch (type) {
          case 'users':
            return this.userTransform( resp.results )
          case 'hospitals':
            return this.hospitalTransfor(resp.results)
          case 'doctors':
            return this.doctorTransfor(resp.results)
          

          default:
            return [];
        }
      })
    )
  }
}
