import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user.model";
import {AuthService} from "../../model/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  user: User = new User();
  // @ts-ignore
  public errorMessage: string;
  // @ts-ignore
  public successMessage: string;

  constructor(private auth: AuthService,
              private router: Router,
              activeRoute: ActivatedRoute) {
    // @ts-ignore
    this.editing = activeRoute.snapshot.params.mode === 'edit';

    // @ts-ignore
    let id = activeRoute.snapshot.params.id;
    // @ts-ignore
    this.auth.displayUserProfile(id).subscribe( data => {
      if(data.success){
        //this.user = data.user;
        Object.assign(this.user, data.user);
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
  }

  changePassword(form: NgForm): void {
    if (form.valid) {
      console.log(JSON.stringify(this.user))

      this.auth.changePassword(this.user).subscribe(data => {
        if(data.success){
          this.successMessage = "User password updated successfully!";

          setTimeout(()=>{
            this.router.navigateByUrl('survey-dashboard');
          }, 2000);


        } else {
          this.errorMessage = data.msg;
        }
      });
    } else {
      this.errorMessage = 'Please enter valid details';
    }
  }

}
