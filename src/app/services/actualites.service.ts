import { Injectable } from '@angular/core';
import {Actualite} from '../models/actualite.model';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})

export class ActualitesService {
  actualite : Actualite[] = [];
  actualiteStatusOn;
  actualitesSubject = new Subject<Actualite[]>();

  constructor(private uplaodsvc : UploadService) { 
  }

  emitActualites(){
    this.actualitesSubject.next(this.actualite);
  }

  saveActualites(){
    firebase.database().ref('/actualites').set(this.actualite);
  }

  updateActualites(actualite: Actualite, id){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref().child('/actualites/' + id)
        .update(actualite)
      }
    )
  }

  getActualites(){
    firebase.database().ref('/actualites').on('value', (data) => {
      this.actualite = data.val() ? data.val() : [];
      this.emitActualites();
    });
  }

  getActualiteStatusOn(){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/actualites/').orderByChild('status').equalTo('publier').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        )
      } 
    );
  }

  getSingleActualite(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/actualites/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getCommission(commission: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/actualites/').child('categorie').orderByChild('name' +commission).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }


  createNewActualite(newActualite: Actualite){
    this.actualite.push(newActualite);
    this.saveActualites();
    this.emitActualites();
  }

  removeActualite(actualite: Actualite){
    if(actualite.photo){
      return this.uplaodsvc.deleteUpload(actualite.photo);
    }

    const actualiteIndexToRemove = this.actualite.findIndex(
      (actualiteEl) => {
        if(actualiteEl === actualite){
          return true;
        }
      }
    );
    this.actualite.splice(actualiteIndexToRemove, 1);
    this.saveActualites();
    this.emitActualites();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
              console.log('Chargement. ..');
            },
            (error) => {
              console.log('Erreur de chargement:' + error);
              reject();
            },
            () => {
              resolve(upload.snapshot.downloadURL);
            }
          );
      }
    );
  }


}
