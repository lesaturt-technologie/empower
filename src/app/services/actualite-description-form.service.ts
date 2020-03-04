import { Injectable } from '@angular/core';
import { ActualiteDescriptionForm } from '../models/actualite-description-form';
import { Subject } from 'rxjs';
import  * as firebase  from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ActualiteDescriptionFormService {

  descriptions : ActualiteDescriptionForm[] = [];
  descriptionsSubject = new Subject<ActualiteDescriptionForm[]>();

  constructor() { }

  emitDescription(){
    this.descriptionsSubject.next(this.descriptions);
  }

  saveDescription(){
    firebase.database().ref('/descriptions').set(this.descriptions);
  }

  getDescription(){
    firebase.database().ref('/descriptions').on('value', (data) => {
      this.descriptions = data.val() ? data.val() : [];
      this.emitDescription();
    });
  }

  createNewDescription(newdescription: ActualiteDescriptionForm){
    this.descriptions.push(newdescription);
    this.saveDescription();
    this.emitDescription();
  }
}
