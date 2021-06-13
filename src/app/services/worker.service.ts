import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const baseUrl = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

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

  submitWorkerBeliefs(worker_id: string, predictions: number[]): Observable<any> {
    let data: any;
    data = {};
    data['worker_id'] = worker_id;
    data['predictions'] = predictions;
    return this.http.post(baseUrl + '/api/worker/submit_worker_beliefs/', data);
  }
}
