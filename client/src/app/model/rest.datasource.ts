import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
  user: User;
  baseUrl: string;
  // @ts-ignore
  authToken: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    }),
  };

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
    //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
    this.baseUrl = `https://multiangular.herokuapp.com/api/`;
    this.user = new User();
  }

  authenticate(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl + 'register',
      user,
      this.httpOptions
    );
  }

  displayUserProfile(id: string): Observable<User> {
    this.loadToken();
    return this.http.get<User>(
      `${this.baseUrl}user/edit/${id}`,
      this.httpOptions
    );
  }

  updateUserProfile(user: User): Observable<User> {
    this.loadToken();
    return this.http.post<User>(
      `${this.baseUrl}user/edit/${user._id}`,
      user,
      this.httpOptions
    );
  }

  changePassword(user: User): Observable<User> {
    this.loadToken();
    return this.http.post<User>(
      `${this.baseUrl}user/chanePassword/${user._id}`,
      user,
      this.httpOptions
    );
  }

  storeUserData(token: any, user: User): void {
    localStorage.setItem('id_token', 'Bearer ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(): Observable<any> {
    // @ts-ignore
    this.authToken = null;
    // @ts-ignore
    this.user = null;
    localStorage.clear();

    return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions);
  }

  loggedIn(): boolean {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  isAdmin(): boolean {
    return this.user.isAdmin;
  }

  private loadToken(): void {
    const token = localStorage.getItem('id_token');
    this.authToken = token || '';
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.authToken
    );
  }
}
