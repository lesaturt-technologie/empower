import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpowerService } from 'src/app/services/empower.service';
import { Router } from '@angular/router';
import { Mission } from 'src/app/models/mission';

@Component({
  selector: 'app-mission-detail',
  templateUrl: './mission-detail.component.html',
  styleUrls: ['../../objectifs/objectif-detail/objectif-detail.component.css']
})
export class MissionDetailComponent implements OnInit {

  mission;
  missionsSubscription: Subscription;
  constructor(private empowerService: EmpowerService, private router: Router) { }

  ngOnInit() {
    this.getmission()
  }

  getmission(){
    this.missionsSubscription = this.empowerService.missionsSubject.subscribe(
      (missions: Mission[]) => {
        this.mission = missions;
      }
    );
    this.empowerService.getMissions();
    this.empowerService.emitMissions();
  }

  onViewEmpower(){
    this.router.navigate(['/empower']);
  }

  onViewActualite(){
    this.router.navigate(['/actualites','feat','2']);
  }

  onBack(){
      this.router.navigate(['admin']);
    }

}
