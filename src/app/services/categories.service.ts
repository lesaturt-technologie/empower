import { Injectable } from '@angular/core';
import {Categorie} from '../models/categorie';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categorie : Categorie[] = [];
  categoriesSubject = new Subject<Categorie[]>();

  constructor() { }

  emitCategories(){
    this.categoriesSubject.next(this.categorie);
  }

  saveCategories(){
    firebase.database().ref('/categories').set(this.categorie);
  }

  getCategories(){
    firebase.database().ref('/categories').on('value', (data) => {
      this.categorie = data.val() ? data.val() : [];
      this.emitCategories();
    });
  }

  getActualitesByCategorie(name: string){
    return new Promise(
      (resolve, reject) => {
        let items = firebase.database().ref('/actualites/')
        items.orderByChild('categorie').equalTo(name)
        items.once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        )
      } 
    );
  }

  getSinglecategorie(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/categories/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewCategorie(newCategorie: Categorie){
    this.categorie.push(newCategorie);
    this.saveCategories();
    this.emitCategories();
  }
}
