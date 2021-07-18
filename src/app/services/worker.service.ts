import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const baseUrl = 'http://127.0.0.1:8000';
// const baseUrl = 'http://192.168.0.106:8000';
const baseUrl = 'https://adm-django-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  constructor(private http: HttpClient) {}

  // Probably remove this. Its pointless
  // we can piggyback worker creation
  // in later http requests.
  addWorker(worker_id: string): Observable<any> {
    const data = new FormData();
    data.append('worker_id', worker_id);
    return this.http.post(baseUrl + '/api/worker/addworker/', data);
  }

  getAttentionResults(worker_id: string): Observable<any> {
    const data = new FormData();
    data.append('worker_id', worker_id);
    return this.http.post(baseUrl + '/api/worker/get_attention_results/', data);
  }

  getComprehensionResults(worker_id: string): Observable<any> {
    const data = new FormData();
    data.append('worker_id', worker_id);
    return this.http.post(
      baseUrl + '/api/worker/get_comprehension_results/',
      data
    );
  }

  getWorkerType(worker_id: string): Observable<any> {
    const data = new FormData();
    data.append('worker_id', worker_id);
    return this.http.post(baseUrl + '/api/worker/get_worker_type/', data);
  }

  submitWorkerBeliefs(
    worker_id: string,
    predictions: number[]
  ): Observable<any> {
    let data: any;
    data = {};
    data['worker_id'] = worker_id;
    data['predictions'] = predictions;
    return this.http.post(baseUrl + '/api/worker/submit_worker_beliefs/', data);
  }

  submitWorkerDecisions(data: any): Observable<any> {
    return this.http.post(
      baseUrl + '/api/worker/submit_approach_decision_minoffer/',
      data
    );
  }

  submitDSSProposerResponse(
    worker_id: string,
    allocationSubmitted: number
  ): Observable<any> {
    let formData: any;
    formData = {};
    formData['worker_id'] = worker_id;
    formData['allocationSubmitted'] = allocationSubmitted;
    return this.http.post(
      baseUrl + '/api/worker/submit_dss_proposer_response/',
      formData
    );
  }

  getUniqueCode(worker_id: string): Observable<any> {
    let formData: any;
    formData = {};
    formData['worker_id'] = worker_id;
    return this.http.post(baseUrl + '/api/worker/get_uniquecode/', formData);
  }
}
