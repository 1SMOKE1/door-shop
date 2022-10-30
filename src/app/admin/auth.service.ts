import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient,
    private router: Router 
    ) {}

    setToken(token: string): void {
      localStorage.setItem('token', token);
    }

    getToken() {
      return localStorage.getItem('token');
    }

    isLoggedIn(): boolean{
      return this.getToken() !== null;
    }

    login(userInfo: {email: string, password: string}): Observable<string | boolean>{
      if(userInfo.email === 'admin@gmail.com' 
      && userInfo.password === 'admin123'){
        this.setToken('asdjasdaspdapsjdopasdiuopaid');
        console.log('ok')
        return of(true)
      }
      return throwError(() => new Error('Failed login'))
    }

    logout(){
      this.router.navigate(['login']);
    }
}
