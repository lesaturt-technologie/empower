import { Component, OnInit, OnDestroy } from '@angular/core';
import { Objectif } from 'src/app/models/objectifs';
import { Subscription } from 'rxjs';
import { EmpowerService } from 'src/app/services/empower.service';
import { Router } from '@angular/router';
import { Mission } from '../models/mission';
import { ActualitesService } from '../services/actualites.service';
import { Layout } from '../models/layout';

@Component({
  selector: 'app-empower',
  templateUrl: './empower.component.html',
  styleUrls: ['./empower.component.css']
})
export class EmpowerComponent implements OnInit, OnDestroy {
  objectif;
  mission;
  layout;
  objectifsSubscription: Subscription;
  missionsSubscription: Subscription;
  layoutSubscription: Subscription;

  constructor(private empowerService: EmpowerService) { }

  ngOnInit() {
    this.getObjectif()
    this.getMission()
    this.getLayout()
  }

  getLayout(){
    this.layoutSubscription = this.empowerService.layoutSubject.subscribe(
      (layout: Layout[]) => {
        this.layout = layout;
      }
    );
    this.empowerService.getLayout();
    this.empowerService.emitLayout();
  }

  getObjectif(){
    this.objectifsSubscription = this.empowerService.objectifsSubject.subscribe(
      (objectifs: Objectif[]) => {
        this.objectif = objectifs;
      }
    );
    this.empowerService.getObjectifs();
    this.empowerService.emitObjectifs();
  }

  getMission(){
    this.missionsSubscription = this.empowerService.missionsSubject.subscribe(
      (missions: Mission[]) => {
        this.mission = missions;
      }
    );
    this.empowerService.getMissions();
    this.empowerService.emitMissions();
  }

  onDeleteActualite(objectif: Objectif){
    this.empowerService.removeObjectif(objectif);
  }

  

  ngOnDestroy(){
    this.objectifsSubscription.unsubscribe();
  }

}
