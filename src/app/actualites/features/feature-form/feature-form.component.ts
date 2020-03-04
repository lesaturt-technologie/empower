import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FeaturesService } from 'src/app/services/features.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Feature } from 'src/app/models/feature';
import { Actualite } from 'src/app/models/actualite.model';
import { ActualitesService } from 'src/app/services/actualites.service';


@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css']
})
export class FeatureFormComponent implements OnInit {

  featureForm : FormGroup;
  actualites;
  featureActualite: Array<Object> = [];
  actualitesSubscription: Subscription;
  FeatIndexArray = [ {
    "index" : "1",
    "name" : "actualites"
  }, {
    "index" : "2",
    "name" : "single categorie"
  }, {
    "index" : "3",
    "name" : "publications"
  }, {
    "index" : "4",
    "name" : "Accueil"
  }]

  constructor(private formBuilder: FormBuilder,
    private featuresService: FeaturesService,
    private router: Router,
    private actualiteService: ActualitesService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.featureForm = this.formBuilder.group({
      name: ['', Validators.required],
      identifiant: ['', Validators.required],
      actualites: this.formBuilder.array([
        this.addActualiteFormGroup()
      ])
    });

    this.actualiteService.getActualiteStatusOn().then(
      (actualite: Actualite) => {
        this.actualites = actualite;
        console.log(actualite);
      }
    );
  }

  submitHandler(){
    let actualitesArray = this.featureForm.value.actualites;
    for (let index = 0; index < actualitesArray.length; index++) {
        this.actualiteService.getSingleActualite(actualitesArray[index].actualite).then(
          (actualites : Actualite[]) => {
            this.featureActualite.push(actualites);
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );
    }
    this.onSaveFeatureActualite(this.featureActualite);
  }

  addActualite(){
    this.addActualiteArray.push(this.addActualiteFormGroup());
  }

  get addActualiteArray () {
    return <FormArray>this.featureForm.get('actualites');
  }


  addActualiteFormGroup(): FormGroup {
    return this.formBuilder.group({
      actualite: ['', Validators.required]
    });
  }

  onSaveFeatureActualite(featureActualites){
    const name = this.featureForm.get('name').value;
    const identifiant = this.featureForm.get('identifiant').value;
    const newfeature = new Feature(name, identifiant);
    newfeature.actualites = featureActualites;
    newfeature.status = "deplubier";
    this.featuresService.createNewfeature(newfeature);
    this.router.navigate(['/admin/actualites']);
  }

}
