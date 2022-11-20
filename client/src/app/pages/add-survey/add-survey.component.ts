import { Component, OnInit } from '@angular/core';

import { ApiserviceService } from 'src/app/apiservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {

  addForm!: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiserviceService,
    public formBuilder: FormBuilder
  ) 
  {
    this.apiService.GetAddSurvey().subscribe((res) => {
      /*this.addForm.setValue({
        title: res['title'],
        description: res['description'],
        date: res['date'],
      });*/
    });
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  addSurvey() {
    this.apiService.AddSurvey(this.addForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
        this.router.navigateByUrl('/survey');
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
