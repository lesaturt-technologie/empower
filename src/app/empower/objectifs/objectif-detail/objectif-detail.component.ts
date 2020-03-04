import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpowerComponent } from '../../empower.component';
import { Subscription } from 'rxjs';
import { EmpowerService } from 'src/app/services/empower.service';
import { Objectif } from 'src/app/models/objectifs';

@Component({
  selector: 'app-objectif-detail',
  templateUrl: './objectif-detail.component.html',
  styleUrls: ['./objectif-detail.component.css'],
  providers:[EmpowerComponent]
})
export class ObjectifDetailComponent implements OnInit {

  objectif;
  objectifsSubscription: Subscription;
  constructor(private empowerService: EmpowerService, private router: Router) { }

  ngOnInit() {
    this.getObjectif()
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
