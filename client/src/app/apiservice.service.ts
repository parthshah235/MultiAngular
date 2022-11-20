import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  // api base url
  BASE_URL: string = 'https://multiangular.herokuapp.com/api';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  // Get all survey
  GetSurvey() {
    return this.httpClient.get(`${this.BASE_URL}/survey/surveyList`);
  }

  // Get all survey
  GetAddSurvey() {
    let API_URL = `${this.BASE_URL}/survey/add`;
    return this.httpClient.get(API_URL);
  }

  // Get all survey
  AddSurvey(data: any): Observable<any> {
    let API_URL = `${this.BASE_URL}/survey/add`;
    return this.httpClient.post(API_URL, data);
  }

  // delete survey
  deleteSurvey(id: any): Observable<any> {
    let API_URL = `${this.BASE_URL}/survey/delete/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders });
  }

  // Get survey by id
  GetSurveyById(id: any): Observable<any> {
    let API_URL = `${this.BASE_URL}/survey/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders });
  }

  // update survey by id
  updateSurveyId(id: any, data: any): Observable<any> {
    let API_URL = `${this.BASE_URL}/survey/edit/${id}`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders });
  }

  // get all survey question
  GetSurveyQuestion() {
    return this.httpClient.get(
      `${this.BASE_URL}/surveyQuestions/surveyQuestionsList`
    );
  }

  // Get survey by id
  GetSurveyQuestionById(id: any): Observable<any> {
    let API_URL = `${this.BASE_URL}/surveyQuestions/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders });
  }

  // update survey by id
  updateSurveyQuestionById(id: any, data: any): Observable<any> {
    let API_URL = `${this.BASE_URL}/surveyQuestions/edit/${id}`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders });
  }

  // delete survey
  deleteSurveyQuestion(id: any): Observable<any> {
    let API_URL = `${this.BASE_URL}/surveyQuestions/delete/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders });
  }

  // add survey Answer by Survey id
  addSurveyAnswer(data: any): Observable<any> {
    let API_URL = `${this.BASE_URL}/surveyAnswers/add`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders });
  }
}
