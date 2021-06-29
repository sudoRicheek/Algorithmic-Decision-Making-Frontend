import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000';
// const baseUrl = 'http://192.168.0.106:8000';


@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private http: HttpClient,
  ) {}

  getAttentionCheckQuestions(): Observable<any> {
    return this.http.get(baseUrl + '/api/question/get_attchk_questions/');
  }

  postAttentionAnswers(formData: any): Observable<any> {
    return this.http.post(baseUrl + '/api/question/post_attchk_response/',formData);
  }

  getComprehensionQuestions(): Observable<any> {
    return this.http.get(baseUrl + '/api/question/get_comp_questions/');
  }

  postComprehensionAnswers(formData: any): Observable<any> {
    return this.http.post(baseUrl + '/api/question/post_comp_response/',formData);
  }
}
