import { Component, OnInit } from '@angular/core';
import { Actualite } from 'src/app/models/actualite.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualitesService } from 'src/app/services/actualites.service';
import { Categorie } from 'src/app/models/categorie';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-single-actualite',
  templateUrl: './single-actualite.component.html',
  styleUrls: ['./single-actualite.component.css']
})
export class SingleActualiteComponent implements OnInit {

    actualite: Actualite;
    categories: Categorie[];
    categoriesSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private actualitesService: ActualitesService,
              private categoriesService: CategoriesService,
              private router: Router) { }

  ngOnInit() {
    this.actualite = new Actualite('','','');
    const id = this.route.snapshot.params['id'];
    this.actualitesService.getSingleActualite(+id).then(
      (actualite: Actualite) => {
        this.actualite = actualite;
      }
    );
    
    this.categoriesSubscription = this.categoriesService.categoriesSubject.subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      }
    );
    this.categoriesService.getCategories();
  }

  onBack(){
    this.router.navigate(['admin']);
  }

}
