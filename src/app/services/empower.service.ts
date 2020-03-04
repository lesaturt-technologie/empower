import { Injectable } from '@angular/core';
import { Objectif } from '../models/objectifs';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Mission } from '../models/mission';
import { Membre } from '../models/organisation';
import { Rapport } from '../models/rapport';
import { Layout } from '../models/layout';

@Injectable({
  providedIn: 'root'
})
export class EmpowerService {

  mission : Mission[] = [];
  objectif : Objectif[] = [];
  organisation : Membre[] = [];
  rapport: Rapport[] = [];
  layout: Layout[] = [];

  missionsSubject = new Subject<Mission[]>();
  objectifsSubject = new Subject<Objectif[]>();
  organisationsSubject = new Subject<Membre[]>();
  rapportsSubject = new Subject<Rapport[]>();
  layoutSubject = new Subject<Layout[]>();
  
  constructor() { }

  saveOrganisations(){
    firebase.database().ref('/membres/').set(this.organisation);
  }

  emitObjectifs(){
    this.objectifsSubject.next(this.objectif);
  }

  emitRapports(){
    this.rapportsSubject.next(this.rapport);
  }

  emitMissions(){
    this.missionsSubject.next(this.mission);
  }

  emitOrganisations(){
    this.organisationsSubject.next(this.organisation)
  }

  emitLayout(){
    this.layoutSubject.next(this.layout)
  }

  saveObjectifs(newObjectif: Objectif){
    const objectifItem = firebase.database().ref('/objectifs')
    objectifItem.update(newObjectif)
    alert('enregistrement effectué avec success')
  }

  saveMissions(newMission: Mission){
    firebase.database().ref('/missions').update(newMission);
  }

  saveRapports(){
    firebase.database().ref('/rapports/').set(this.rapport);
  }

  getObjectifs(){
    firebase.database().ref('/objectifs').on('value', (data) => {
      this.objectif = data.val() ? data.val() : [];
      this.emitObjectifs();
    });
  }

  getLayout(){
    firebase.database().ref('/layout').on('value', (data) => {
      this.layout = data.val() ? data.val() : [];
      this.emitLayout();
    });
  }

  getOrganisations(){
    firebase.database().ref('/membres/').on('value', (data) => {
      this.organisation = data.val() ? data.val() : [];
      this.emitOrganisations();
    });
  }

  getRapports(){
    firebase.database().ref('/rapports/').on('value', (data) => {
      this.rapport = data.val() ? data.val() : [];
      this.emitRapports();
    });
  }

  getSingleRapport(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/rapports/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getMissions(){
    firebase.database().ref('/missions').on('value', (data) => {
      this.mission = data.val() ? data.val() : [];
      this.emitMissions();
    });
  }


  getSingleMembre(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/membres/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewMembre(newOrganisation: Membre){
    //console.log(newOrganisation)    
    this.organisation.push(newOrganisation);
    //console.log(this.organisation)
    this.saveOrganisations();
    this.emitOrganisations();
  }

  createLayout(newLayout: Layout){
    firebase.database().ref('/layout').update(newLayout);
  }

  createNewRapport(newRapport: Rapport){ 
    this.rapport.push(newRapport);
    this.saveRapports();
    this.emitRapports();
  }


  removeObjectif(objectif: Objectif){
    if(objectif.profile){
      const storageRef = firebase.storage().refFromURL(objectif.profile);
      storageRef.delete().then(
        () => {
          console.log('photo supprimer');
        }
      ).catch(
          (error) => {
            console.log('Fichier non trouvé : ' + error);
          }
      );
    }
    const objectifIndexToRemove = this.objectif.findIndex(
      (objectifEl) => {
        if(objectifEl === objectif){
          return true;
        }
      }
    );
    this.objectif.splice(objectifIndexToRemove, 1);
    //this.saveObjectifs();
    this.emitObjectifs();
  }

  removeMission(mission: Mission){
    if(mission.profile){
      const storageRef = firebase.storage().refFromURL(mission.profile);
      storageRef.delete().then(
        () => {
          console.log('photo supprimer');
        }
      ).catch(
          (error) => {
            console.log('Fichier non trouvé : ' + error);
          }
      );
    }
    const missionIndexToRemove = this.mission.findIndex(
      (missionEl) => {
        if(missionEl === mission){
          return true;
        }
      }
    );
    this.objectif.splice(missionIndexToRemove, 1);
    //this.saveObjectifs();
    this.emitObjectifs();
  }

  removeMembre(membre: Membre){
    if(membre.profile){
      const storageRef = firebase.storage().refFromURL(membre.profile);
      storageRef.delete().then(
        () => {
          console.log('photo supprimer');
        }
      ).catch(
          (error) => {
            console.log('Fichier non trouvé : ' + error);
          }
      );
    }
    const membreIndexToRemove = this.organisation.findIndex(
      (membreEl) => {
        if(membreEl === membre){
          return true;
        }
      }
    );
    this.organisation.splice(membreIndexToRemove, 1);
    this.saveOrganisations();
    this.emitOrganisations();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/empower/' + almostUniqueFileName + file.name)
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
