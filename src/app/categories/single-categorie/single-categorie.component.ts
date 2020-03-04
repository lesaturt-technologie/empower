import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeaturesService } from 'src/app/services/features.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categorie } from 'src/app/models/categorie';
import { Feature } from 'src/app/models/feature';
import paginate from 'src/app/paginator.util';


@Component({
  selector: 'app-single-categorie',
  templateUrl: './single-categorie.component.html'
})
export class SingleCategorieComponent implements OnInit {

  
  featactualites;
  actualitesByCategorie;
  categorie;
  namecategorie;

  @Input() pageSize = 6;
  @Input() maxPages = 100;
  @Input() previousLabel = 'Previous';
  @Input() nextLabel = 'Next';
  @Input() screenReaderPaginationLabel = 'Pagination';
  @Input() screenReaderPageLabel = 'page';
  @Input() screenReaderCurrentLabel = `You're on page`;
  @Output() onItemClick: EventEmitter<any> = new EventEmitter();

  private currentPage = 1;
  private pages: Array<number>;
  private startIndex: number;
  private endIndex: number;


  constructor(
      private featureService: FeaturesService,
      private categorieService: CategoriesService,
      private route: ActivatedRoute,
      private router: Router,
      ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const categorieid = this.route.snapshot.params['categorie'];
    this.getSingleCategorie(categorieid);
    this.getSingleFeature(id);  
  }

  onViewActualite(id: number){
    this.router.navigate(['/actualites','view', id]);
  }

  getAllActualitesByCategorie(name){
    this.categorieService.getActualitesByCategorie(name).then(
      (actualites) => {
        this.actualitesByCategorie = actualites;
        this.calculateIndexes();
      }
    )
  }

  getSingleFeature(id){
    this.featureService.getSinglefeature(id).then(
      (feature: Feature) => {
        this.featactualites = feature.actualites;
        console.log(this.featactualites)
      }
    );
  }

  getSingleCategorie(categorie: number){
    this.categorieService.getSinglecategorie(+categorie).then(
      (categorie: Categorie) => {
        this.categorie = categorie;
        this.namecategorie = categorie.name
        this.getAllActualitesByCategorie(this.namecategorie);
        console.log(this.actualitesByCategorie);
      }
    );
  }

  calculateIndexes() {
    const pagination = paginate(
      this.actualitesByCategorie.length,
      this.currentPage,
      this.pageSize,
      this.maxPages
    );
    
    this.currentPage = pagination.currentPage;
    this.pages = pagination.pages;
    this.startIndex = pagination.startIndex;
    this.endIndex = pagination.endIndex;
  }

  previous(e) {
    e.preventDefault();
    this.currentPage--;
    this.calculateIndexes();
  }

  next(e) {
    e.preventDefault();
    this.currentPage++;
    this.calculateIndexes();
  }

  setCurrent(e, page) {
    e.preventDefault();
    this.currentPage = page;
    this.calculateIndexes();
  }


  onClick(item) {
    this.onItemClick.emit(item);
  }

  bumbCb(dubb) {
    console.log(dubb);
  }

}
