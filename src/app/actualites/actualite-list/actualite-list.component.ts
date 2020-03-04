import { Component, OnInit, OnDestroy } from '@angular/core';
import {Actualite} from '../../models/actualite.model';
import { Subscription } from 'rxjs';
import { ActualitesService } from 'src/app/services/actualites.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingleActualiteComponent } from '../single-actualite/single-actualite.component';


@Component({
  selector: 'app-actualite-list',
  templateUrl: './actualite-list.component.html',
  styleUrls: ['./actualite-list.component.css'],
  providers:[SingleActualiteComponent]
})

export class ActualiteListComponent implements OnInit, OnDestroy {

  actualites: Actualite[];
  actualitesSubscription: Subscription;
  closeResult: string;
  ActualitePostsArray = [ {
    "index" : "0",
    "name" : "colonne6"
  }, {
    "index" : "1",
    "name" : "colonne 6 ligne 12"
  }, {
    "index" : "2",
    "name" : "colonne 6 ligne 12 colonne 1"
  }, {
    "index" : "3",
    "name" : "colonne 6 ligne 12 colonne 2"
  }, {
    "index" : "4",
    "name" : "none"
  } ]
  
  SingleActuality;

  constructor(private actualitesService: ActualitesService, private router: Router,private modalService: NgbModal) { }

  ngOnInit() {
      this.actualitesSubscription = this.actualitesService.actualitesSubject.subscribe(
        (actualites: Actualite[]) => {
          this.actualites = actualites;
        }
      );
      this.actualitesService.getActualites();
      this.actualitesService.emitActualites();
  }

  onNewActualite(){
    this.router.navigate(['/admin','actualites', 'new']);
  }

  onDeleteActualite(actualite: Actualite){
    this.actualitesService.removeActualite(actualite);
  }

  onViewActualite(id: number){
    this.router.navigate(['/admin','actualites','view', id]);
  }

  ngOnDestroy(){
    this.actualitesSubscription.unsubscribe();
  }

  PublierActualite(actualite: Actualite, f){
    actualite.position = f.value.position;
    actualite.status = "publier";
      if(f.value.position != "4") {
        this.ActualitePostsArray = this.ActualitePostsArray.filter(function(returnableObjects){
          return returnableObjects.index !== f.value.position;
        });
    }
    return this.actualitesService.updateActualites(actualite, actualite.id);
  }

  DepublierActualite(actualite: Actualite){
    switch (actualite.position) {
      case '0':
          this.ActualitePostsArray.push({
            "index" : "0",
            "name" : "colonne 6"
          })
        break;
    case '1':
        this.ActualitePostsArray.push({
          "index" : "1",
          "name" : "colonne 6 ligne 12"
        })
        break;
    case '2':
        this.ActualitePostsArray.push({
          "index" : "2",
          "name" : "colonne 6 ligne 12 colonne 1"
        })
        break;
    case '3':
        this.ActualitePostsArray.push({
          "index" : "3",
          "name" : "colonne 6 ligne 12 colonne 2"
        })
        break;
    }
    actualite.status = "depublier";
    return this.actualitesService.updateActualites(actualite, actualite.id);
  }

  openScrollableContent(longContent, id) {
      this.SingleActuality = new Actualite('','','');
      this.actualitesService.getSingleActualite(+id).then(
        (actualite: Actualite) => {
          this.SingleActuality = actualite;
          this.SingleActuality.id = id;
        }
      );
    this.modalService.open(longContent, { scrollable: true });
  }

}
