import { Component, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  categories: Categorie[];
  categoriesSubscription: Subscription;

  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit() {
      this.categoriesSubscription = this.categoriesService.categoriesSubject.subscribe(
        (categories: Categorie[]) => {
          this.categories = categories;
        }
      );
      this.categoriesService.getCategories();
      this.categoriesService.emitCategories();
  }

  onNewCategorie(){
    this.router.navigate(['/categories', 'new']);
  }

  onDeleteCategorie(categorie: Categorie){
   // this.categoriesService.removeCategorie(categorie);
  }

  onViewcategorie(id: number){
    this.router.navigate(['/categories','view', id]);
  }

  ngOnDestroy(){
    this.categoriesSubscription.unsubscribe();
  }

}
