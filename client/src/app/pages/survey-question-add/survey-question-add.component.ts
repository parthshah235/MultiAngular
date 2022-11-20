import { Component, OnInit } from '@angular/core';
import {BasePageComponent} from "../../partials/base-page/base-page.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-survey-question-add',
  templateUrl: './survey-question-add.component.html',
  styleUrls: ['./survey-question-add.component.css']
})
export class SurveyQuestionsAddComponent extends BasePageComponent implements OnInit {

  constructor(route: ActivatedRoute) {
    super(route);
  }

  override ngOnInit(): void {
  }

}