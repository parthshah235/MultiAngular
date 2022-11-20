import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestDataSource} from './rest.datasource';
import {User} from './user.model';

@Injectable()
export class AuthService {
  user: User;

  constructor(private datasource: RestDataSource) {
    this.user = new User();
  }

  authenticate(user: User): Observable<any> {
    return this.datasource.authenticate(user);
  }

  displayUserProfile(id: string): Observable<any>{
    return this.datasource.displayUserProfile(id);
  }

  updateUserProfile(user: User): Observable<any>{
    return this.datasource.updateUserProfile(user);
  }

  register(user: User): Observable<any> {
    return this.datasource.register(user);
  }

  changePassword(user: User): Observable<any>{
    return this.datasource.changePassword(user);
  }

  storeUserData(token: any, user: User): void {
    this.datasource.storeUserData(token, user);
  }

  get authenticated(): boolean {
    return this.datasource.loggedIn();
  }

  isAdmin(): boolean {
    return this.datasource.isAdmin();
  }

  logout(): Observable<any> {
    return this.datasource.logout();
  }

}
