import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../model/auth.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  // @ts-ignore
  user: User;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  onLogoutClick(): void {
    this.authService.logout().subscribe(data => {
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn(): boolean {
    const result = this.authService.authenticated;
    if (result) {
      // @ts-ignore
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    return result;
  }

  isAdmin(): boolean {

    const result = this.authService.authenticated;
    if (result) {
      // @ts-ignore
      this.user = JSON.parse(localStorage.getItem('user'));
      return this.user.isAdmin;
    } else {
      return false;
    }
  }

}
