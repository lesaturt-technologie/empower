import { Component, OnInit } from '@angular/core';
import { Membre } from 'src/app/models/organisation';
import { Subscription } from 'rxjs';
import { EmpowerService } from 'src/app/services/empower.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html'
})

export class OrganisationsComponent implements OnInit {

membres: Membre[];
organisationsSubscription: Subscription;

  constructor(private organisationsService: EmpowerService, private router: Router) { }

  ngOnInit() {
    this.organisationsSubscription = this.organisationsService.organisationsSubject.subscribe(
      (organisations: Membre[]) => {
        this.membres = organisations
      }
    );
    this.organisationsService.getOrganisations();
    this.organisationsService.emitOrganisations();
  }

  onViewOrganisation(id: number){
    this.router.navigate(['/empower','membre','view',id]);
  }

}
