import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs'
import * as jwtDecode from 'jwt-decode'

export const TOKEN_NAME: string = 'jwt'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  private apiUrl = 'http://127.0.0.1:5000'
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private router: Router, private http: HttpClient) { 
    if(this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    }
  }

  login(username: string, password: string) {
    return this.http.post(this.apiUrl + '/login', {username, password}, { headers: this.headers })
    .toPromise()
    .then( (res: HttpResponse<any>) => {
      if (res.hasOwnProperty('jwt')) {
        this.setToken(res['jwt'])
        return true
      }
      return false
    })
  }
  
  private getToken(): string {
    return localStorage.getItem(TOKEN_NAME)
  }

  setToken(token: string): void {
    return localStorage.setItem(TOKEN_NAME, token)
  }
  
  private getTokenExpiration(token: string): Date {
    const decoded = jwtDecode(token)
    if (decoded.exp === undefined) {
      return null
    }
    const date = new Date(0)
    date.setUTCSeconds(decoded.exp)
    return date
  }

  public isTokenExpired(token?: string): boolean {
    token = token || this.getToken()
    if (!token) return true

    const date = this.getTokenExpiration(token)
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  
}


export class AuthRequestOptions implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(TOKEN_NAME)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer asd'});    // Clone the request to add the new header
    const clonedRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${token}`) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}