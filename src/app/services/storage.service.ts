import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  addWorker(worker_id: string) {
    localStorage.clear();
    localStorage.setItem('worker_id', worker_id);
  }

  getWorker() {
    let currentWorker = localStorage.getItem('worker_id');
    if (!currentWorker) return null;
    else return currentWorker;
  }

  storeAttentionSubmissions(formData: any) {
    interface mapType {
      [key: number]: number
    }
    let dictMapData: mapType;
    dictMapData = {};

    formData.forEach((element: { q_id: any; c_id: any; }) => {
      dictMapData[element.q_id] = element.c_id;
    });
    localStorage.setItem('attentionSubmissions', JSON.stringify(dictMapData));
    localStorage.setItem("attentionSubmitted","true");
    console.log(dictMapData);
  }

  getAttentionSubmissions() {
    let localAttentionSubmissions = localStorage.getItem("attentionSubmissions");
    if (!localAttentionSubmissions) return null;
    else return JSON.parse(localAttentionSubmissions);
  }

  attentionSubmitted(){
    localStorage.setItem("attentionSubmitted","true");
  }

  isAttentionSubmitted(){
    let alreadySubmitted = localStorage.getItem("attentionSubmitted");
    if (!alreadySubmitted) return false;
    else return true;
  }

  storeComprehensionSubmissions(formData: any) {
    interface mapType {
      [key: number]: number
    }
    let dictMapData: mapType;
    dictMapData = {};

    formData.forEach((element: { q_id: any; c_id: any; }) => {
      dictMapData[element.q_id] = element.c_id;
    });
    localStorage.setItem('comprehensionSubmissions', JSON.stringify(dictMapData));
    localStorage.setItem("comprehensionSubmitted","true");
    console.log(dictMapData);
  }

  getComprehensionSubmissions() {
    let localComprehensionSubmissions = localStorage.getItem("comprehensionSubmissions");
    if (!localComprehensionSubmissions) return null;
    else return JSON.parse(localComprehensionSubmissions);
  }

  comprehensionSubmitted(){
    localStorage.setItem("comprehensionSubmitted","true");
  }

  isComprehensionSubmitted(){
    let alreadySubmitted = localStorage.getItem("comprehensionSubmitted");
    if (!alreadySubmitted) return false;
    else return true;
  }
}
