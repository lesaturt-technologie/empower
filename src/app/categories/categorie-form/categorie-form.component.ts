import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html'
})
export class CategorieFormComponent implements OnInit {

  categorieForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.categorieForm = this.formBuilder.group({
      name: ['', Validators.required],
      libelle: ['', Validators.required],
      groupe: ['', Validators.required],
    });
  }

  onSaveCategorie(){
    const name = this.categorieForm.get('name').value;
    const libelle = this.categorieForm.get('libelle').value;
    const groupe = this.categorieForm.get('groupe').value;
    const newcategorie = new Categorie(name, libelle, groupe);
    this.categoriesService.createNewCategorie(newcategorie);
    this.router.navigate(['/admin/actualites']);
  }

}
