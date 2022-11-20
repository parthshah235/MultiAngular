import { ApiserviceService } from 'src/app/apiservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css'],
})
export class SurveyEditComponent implements OnInit {
  getId: any;
  updateForm!: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiserviceService,
    public formBuilder: FormBuilder
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.GetSurveyById(this.getId).subscribe((res) => {
      console.log('Response ', res);
      this.updateForm.setValue({
        surveyId: res['_id'],
        title: res['title'],
        description: res['description'],
        userId: res['userId'],
      });
    });
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      surveyId: [''],
      title: [''],
      description: [''],
      userId: [''],
    });
  }
  updateSurvey() {
    this.apiService.updateSurveyId(this.getId, this.updateForm.value).subscribe(
      () => {
        console.log('Data updated successfully!');
        this.router.navigateByUrl('/survey');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
