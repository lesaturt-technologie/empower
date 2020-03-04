import { Component, OnInit } from '@angular/core';
import { ActualitesService } from 'src/app/services/actualites.service';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { Subscription, from } from 'rxjs';
import { ActualiteListComponent } from '../actualite-list/actualite-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Actualite } from 'src/app/models/actualite.model';
import { Categorie } from 'src/app/models/categorie';
import { FeaturesService } from 'src/app/services/features.service';
import { Feature } from 'src/app/models/feature';
import { TabsactualiteComponent } from 'src/app/actualites/tabs/tabsactualite';

@Component({
  selector: 'app-actualites-generales',
  templateUrl: './actualites-generales.component.html',
  providers: [ActualiteListComponent]
})
export class ActualitesGeneralesComponent implements OnInit {

  actualite: Actualite;
  actualites;
  featactualites;
  categories: Categorie[];
  categoriesSubscription: Subscription;
  filter = "generale"

  constructor(private route: ActivatedRoute,
              private actualitesService: ActualitesService,
              private categoriesService: CategoriesService,
              private featureService: FeaturesService,
              private router: Router) { }

  ngOnInit() {
    this.actualite = new Actualite('','','');
    const id = this.route.snapshot.params['id'];
    this.actualitesService.getActualiteStatusOn().then(
      (actualite: Actualite) => {
        this.actualites = actualite;
      }
    );
    
    this.categoriesSubscription = this.categoriesService.categoriesSubject.subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      }
    );
    this.categoriesService.getCategories();
    this.featureService.getSinglefeature(id).then(
      (feature: Feature) => {
        this.featactualites = feature.actualites;
      }
    );
  }

  actualitebuild(actualite){
    console.log(actualite)
  }

  onViewActualite(id: number){
    this.router.navigate(['/actualites','view', id]);
  }
  

  /*ActualiteGroupByCategorie(actualites){
    const source = from(actualites);
    //group by categorie
    const actualiteGroup = source.pipe(
      groupBy(actualite => actualite.categorie),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );
      return actualiteGroup.subscribe(val => console.log(val));
  }*/
}