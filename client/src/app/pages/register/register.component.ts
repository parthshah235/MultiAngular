import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/user.model";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../model/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  editing = false;
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

    if (this.editing) {
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
  }

  ngOnInit(): void {
  }

  save(form: NgForm): void {
    if (form.valid) {
      if (this.user._id === null || this.user._id === '' || this.user._id === undefined) {
        this.auth.register(this.user).subscribe(data => {
          if(data.success){
            this.successMessage = "User created successfully!";
            setTimeout(()=>{
              this.router.navigateByUrl('survey-dashboard');
            }, 2000);
          } else {
            this.errorMessage = data.msg;
          }
        });
      } else {
        this.auth.updateUserProfile(this.user).subscribe(data => {
          if(data.success){
            this.successMessage = "User updated successfully!";

            setTimeout(()=>{
              this.router.navigateByUrl('survey-dashboard');
            }, 2000);


          } else {
            this.errorMessage = data.msg;
          }
        });
      }
    } else {
      this.errorMessage = 'Please enter valid details';
    }
  }
}
