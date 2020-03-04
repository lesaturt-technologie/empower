import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Feature } from '../models/feature';
import { Subject } from 'rxjs';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  feature;
  featurActu;
  featuresSubject = new Subject<Feature[]>();

  constructor() { }

  emitfeatures(){
    this.featuresSubject.next(this.feature);
  }

  getfeatures(){ 
    firebase.database().ref('/features').on('value', (data) => {
      this.feature = data.val() ? data.val() : [];
      this.emitfeatures();
    });
  }

  getFeatureStatusOn(){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/features/').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        )
      } 
    );
  }

  updateFeatures(Feature: Feature, id){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref().child('/features/' + id)
        .update(Feature)
      }
    )
  }

  getSinglefeature(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/features/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewfeature(newfeature: Feature){
    firebase.database().ref().child('/features/' + newfeature.identifiant)
    .update(newfeature).then(
      (resolve) => {
        console.log(resolve)
      }
    ).catch(
      (error) => {
        console.log(error)
      })
    this.emitfeatures();
  }
}
