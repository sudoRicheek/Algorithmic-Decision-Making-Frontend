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
      [key: number]: number;
    }
    let dictMapData: mapType;
    dictMapData = {};

    formData.forEach((element: { q_id: any; c_id: any }) => {
      dictMapData[element.q_id] = element.c_id;
    });
    localStorage.setItem('attentionSubmissions', JSON.stringify(dictMapData));
    localStorage.setItem('attentionSubmitted', 'true');
    console.log(dictMapData);
  }

  getAttentionSubmissions() {
    let localAttentionSubmissions = localStorage.getItem(
      'attentionSubmissions'
    );
    if (!localAttentionSubmissions) return null;
    else return JSON.parse(localAttentionSubmissions);
  }

  attentionSubmitted() {
    localStorage.setItem('attentionSubmitted', 'true');
  }

  isAttentionSubmitted() {
    let alreadySubmitted = localStorage.getItem('attentionSubmitted');
    if (!alreadySubmitted) return false;
    else return true;
  }

  storeComprehensionSubmissions(formData: any) {
    interface mapType {
      [key: number]: number;
    }
    let dictMapData: mapType;
    dictMapData = {};

    formData.forEach((element: { q_id: any; c_id: any }) => {
      dictMapData[element.q_id] = element.c_id;
    });
    localStorage.setItem(
      'comprehensionSubmissions',
      JSON.stringify(dictMapData)
    );
    localStorage.setItem('comprehensionSubmitted', 'true');
    console.log(dictMapData);
  }

  getComprehensionSubmissions() {
    let localComprehensionSubmissions = localStorage.getItem(
      'comprehensionSubmissions'
    );
    if (!localComprehensionSubmissions) return null;
    else return JSON.parse(localComprehensionSubmissions);
  }

  comprehensionSubmitted() {
    localStorage.setItem('comprehensionSubmitted', 'true');
  }

  isComprehensionSubmitted() {
    let alreadySubmitted = localStorage.getItem('comprehensionSubmitted');
    if (!alreadySubmitted) return false;
    else return true;
  }

  beliefElicitationSubmitted() {
    localStorage.setItem('beliefelicitationSubmitted', 'true');
  }

  storeBeliefElicitationSubmissions(predictions: any) {
    localStorage.setItem(
      'beliefElicitationSubmissions',
      JSON.stringify(predictions)
    );
  }

  getBeliefElicitationSubmissions() {
    let beliefSubmissions = localStorage.getItem(
      'beliefElicitationSubmissions'
    );
    if (beliefSubmissions) return JSON.parse(beliefSubmissions);
    else return null;
  }

  isBeliefElicitationSubmitted() {
    let alreadySubmitted = localStorage.getItem('beliefelicitationSubmitted');
    if (!alreadySubmitted) return false;
    else return true;
  }

  approachDecisionSubmitted() {
    localStorage.setItem('approachDecisionSubmitted', 'true');
  }

  isApproachDecisionSubmitted() {
    let alreadySubmitted = localStorage.getItem('approachDecisionSubmitted');
    if (!alreadySubmitted) return false;
    else return true;
  }

  storeApproachDecisionSubmissions(
    approachDecision: number,
    allocationSelected: number
  ) {
    let data: any;
    data = {};
    data['approachDecision'] = approachDecision;
    data['allocationSelected'] = allocationSelected;
    localStorage.setItem('approachDecisionSubmissions', JSON.stringify(data));
  }

  getApproachDecisionSubmissions() {
    let approachDecisionSubmissions = localStorage.getItem(
      'approachDecisionSubmissions'
    );
    if (approachDecisionSubmissions)
      return JSON.parse(approachDecisionSubmissions);
    else return null;
  }

  storePostExperimentalSubmissions(formData: any) {
    interface mapType {
      [key: number]: number;
    }
    let dictMapData: mapType;
    dictMapData = {};

    formData.forEach((element: { q_id: any; c_id: any }) => {
      dictMapData[element.q_id] = element.c_id;
    });

    localStorage.setItem(
      'postExperimentalSubmissions',
      JSON.stringify(dictMapData)
    );
    localStorage.setItem('postExperimentalSubmitted', 'true');
  }

  getPostExperimentalSubmissions() {
    let localPostExperimentalSubmissions = localStorage.getItem(
      'postExperimentalSubmissions'
    );
    if (!localPostExperimentalSubmissions) return null;
    else return JSON.parse(localPostExperimentalSubmissions);
  }

  postExperimentalSubmitted() {
    localStorage.setItem('postExperimentalSubmitted', 'true');
  }

  isPostExperimentalSubmitted() {
    let alreadySubmitted = localStorage.getItem('postExperimentalSubmitted');
    if (!alreadySubmitted) return false;
    else return true;
  }

  storeDSSProposerData(dssProposerAllocation: number){
    localStorage.setItem('dssProposerSubmitted','true');
    localStorage.setItem('dssProposerAllocation',JSON.stringify(dssProposerAllocation));
  }

  isDSSProposerSubmitted() {
    let alreadySubmitted = localStorage.getItem('dssProposerSubmitted');
    if (!alreadySubmitted) return false;
    else return true;
  }

  getDSSProposerAllocation() {
    let allocation = localStorage.getItem('dssProposerAllocation');
    if (!allocation) return null;
    else return JSON.parse(allocation);
  }
}
