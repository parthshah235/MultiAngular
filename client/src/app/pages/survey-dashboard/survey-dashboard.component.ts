import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import {AuthService} from "../../model/auth.service";

@Component({
  selector: 'app-survey-dashboard',
  templateUrl: './survey-dashboard.component.html',
  styleUrls: ['./survey-dashboard.component.css']
})
export class SurveyDashboardComponent implements OnInit {

  Survey: any = [];
  constructor(private apiService: ApiserviceService, public authService: AuthService) {}
  ngOnInit(): void {
    this.apiService.GetSurvey().subscribe((res: any) => {
      this.Survey = res;
    });
  }

}
