import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-survey-answer',
  templateUrl: './survey-answer.component.html',
  styleUrls: ['./survey-answer.component.css'],
})
export class SurveyAnswerComponent implements OnInit {
  SurveyQuestion: any = [];

  constructor(
    private apiService: ApiserviceService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.apiService.GetSurveyQuestion().subscribe((res) => {
      console.log(res);
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
