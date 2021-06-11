import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000';

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
    return this.http.post(baseUrl + '/api/worker/get_attention_results/',data);
  }

  getComprehensionResults(worker_id: string): Observable<any> {
    const data = new FormData();
    data.append('worker_id', worker_id);
    return this.http.post(baseUrl + '/api/worker/get_comprehension_results/',data);
  }
}
