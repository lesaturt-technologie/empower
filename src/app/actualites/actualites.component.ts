import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualitesService } from '../services/actualites.service';
import { CategoriesService } from '../services/categories.service';
import { FeaturesService } from '../services/features.service';
import { Actualite } from '../models/actualite.model';
import { Feature } from '../models/feature';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})

export class ActualitesComponent implements OnInit {

  actualite: Actualite;
  actualites;
  featactualites;

  constructor(private route: ActivatedRoute,
    private actualitesService: ActualitesService,
    private featureService: FeaturesService,
    private router: Router) { }

  ngOnInit() {
    const id = 2;
    this.actualitesService.getActualiteStatusOn().then(
      (actualite: Actualite) => {
        this.actualites = actualite;
      }
    );

    this.featureService.getSinglefeature(id).then(
      (feature: Feature) => {
        this.featactualites = feature.actualites;
      }
    );
  }

  onViewActualite(id: number){
    this.router.navigate(['/actualites','view', id]);
  }

}
