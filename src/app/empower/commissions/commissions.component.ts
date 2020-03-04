import { Component, OnInit, Input } from '@angular/core';
import { ActualitesService } from 'src/app/services/actualites.service';
import { Actualite } from 'src/app/models/actualite.model';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html'
})
export class CommissionsComponent implements OnInit {
  @Input() layout;
  actualites
  filter = "commissions"
  constructor(private actualitesService: ActualitesService) { }

  ngOnInit() {
    this.actualitesService.getActualiteStatusOn().then(
      (actualite: Actualite) => {
        this.actualites = actualite;
      }
    );
  }

}
