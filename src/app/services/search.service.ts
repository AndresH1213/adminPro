import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
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

          default:
            return [];
        }
      })
    )
  }
}
