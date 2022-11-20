import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css'],
})
export class TakeSurveyComponent implements OnInit {
  getId: any;
  surveyAnswerForm!: FormGroup;
  surveyData: any = {};
  user: string = '';
  surveyId: string = '';
  userId: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiserviceService,
    public formBuilder: FormBuilder
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.GetSurveyQuestionById(this.getId).subscribe((res) => {
      console.log('Question', res);
      if (res) {
        this.surveyData = res;
        this.surveyId = res.surveyId;
        this.user = res.userId;
      }
    });
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const loginuserId = JSON.parse(userInfo);
      this.userId = loginuserId._id;
      console.log('Login User Id', this.userId);
    }
  }

  ngOnInit(): void {
    this.surveyAnswerForm = this.formBuilder.group({
      userId: [''],
      questionId: [''],
      answer1: [''],
      answer2: [''],
      answer3: [''],
      answer4: [''],
      answer5: [''],
    });
  }

  submitSurvey() {
    console.log('Data', this.surveyAnswerForm.value);
    console.log('UserId', this.user);
    console.log('survey id', this.surveyId);
    console.log('Question Id', this.getId);
    const surveyAnswerData = {
      userId: this.userId ? this.userId : this.user,
      questionId: this.getId,
      answer1: this.surveyAnswerForm.value.answer1,
      answer2: this.surveyAnswerForm.value.answer2,
      answer3: this.surveyAnswerForm.value.answer3,
      answer4: this.surveyAnswerForm.value.answer4,
      answer5: this.surveyAnswerForm.value.answer5,
    };
    console.log('Survey Answer Data', surveyAnswerData);
    this.apiService.addSurveyAnswer(surveyAnswerData).subscribe(
      (res) => {
        console.log('Data updated successfully!', res);
        this.router.navigateByUrl('/survey-question');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
