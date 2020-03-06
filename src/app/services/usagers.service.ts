import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Headline } from '../models/headline';
import { Benefit } from '../models/benefit';
import { Commission } from '../models/commission';
import { Collectif } from '../models/collectif';

@Injectable({
  providedIn: 'root'
})
export class UsagersService {
  headline
  benefit
  headlineSubject = new Subject<Headline[]>();
  benefitSubject = new Subject<Benefit[]>();
  constructor() { }

  emitusagersHeadline(){
    this.headlineSubject.next(this.headline)
  }

  getUsagersCommission(){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/usagersCommission').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getUsagerscollectif(){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/usagersCollectif').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getusagersBenefit(){ 
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/usagersBenefit').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getusagersHeadline(){ 
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/usagersHeadline').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  updateUsagersCollectif(collectif: Collectif){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref().child('/usagersCollectif')
        .update(collectif)
      }
    )
  }

  updateUsagersCommission(commission: Commission){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref().child('/usagersCommission')
        .update(commission)
      }
    )
  }

  updateusagersHeadline(Headline: Headline){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref().child('/usagersHeadline')
        .update(Headline)
      }
    )
  }

  emitusagersBenefit(){
    this.benefitSubject.next(this.benefit)
  }

  updateusagersBenefit(Benefit: Benefit){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref().child('/usagersBenefit')
        .update(Benefit)
      }
    )
  }
}