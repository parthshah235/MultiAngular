import { ApiserviceService } from './../../apiservice.service';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../model/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  Survey: any = [];

  constructor(private apiService: ApiserviceService, public authService: AuthService) {}

  ngOnInit(): void {
    this.apiService.GetSurvey().subscribe((res) => {
      console.log(res);
      this.Survey = res;
    });
  }

  deleteSurvey(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do You Want Delete?')) {
      this.apiService.deleteSurvey(id).subscribe(() => {
        this.Survey.splice(i, 1);
      });
    }
  }

}
