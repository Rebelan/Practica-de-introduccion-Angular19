import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  isLogged = signal<boolean>(this.hasToken());
  
  hasToken(): boolean {
    return localStorage.getItem('token') !== null
  }

  login(username: string, password: string): boolean {
    if(username && password){
      localStorage.setItem('token','token-falso');
      this.isLogged.set(true);
      return true;
    }
    return false;
  }

  logout(): void{
    localStorage.removeItem('token');
    this.isLogged.set(false);
  }
}
