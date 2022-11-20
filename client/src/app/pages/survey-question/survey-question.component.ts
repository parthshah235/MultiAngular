import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import {User} from "../../model/user.model";
import {AuthService} from "../../model/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.css'],
})
export class SurveyQuestionComponent implements OnInit {
  SurveyQuestion: any = [];

  constructor(private apiService: ApiserviceService, public authService: AuthService) {}

  ngOnInit(): void {
    this.apiService.GetSurveyQuestion().subscribe((res) => {
      this.SurveyQuestion = res;
    });
  }

  deleteSurveyQuestion(id: any, i: any) {
    if (window.confirm('Do You Want Delete?')) {
      this.apiService.deleteSurveyQuestion(id).subscribe(() => {
        this.SurveyQuestion.splice(i, 1);
      });
    }
  }
}
