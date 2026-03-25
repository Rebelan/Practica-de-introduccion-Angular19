import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';




export interface Geo{
  lat: string;
  lng: string;
}

export interface Address{
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company{
  name: string;
  catchPhrase: string;
  bs: string
}

export interface User{
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class AboutApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'

  private http = inject(HttpClient);

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserId(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
