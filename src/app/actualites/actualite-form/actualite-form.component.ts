import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActualitesService } from 'src/app/services/actualites.service';
import { Router } from '@angular/router';
import { Actualite } from 'src/app/models/actualite.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categorie } from 'src/app/models/categorie';
import { Subscription} from 'rxjs';
import { UploadComponent } from 'src/app/upload/upload.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-actualite-form',
  templateUrl: './actualite-form.component.html',
  styleUrls: ['./actualite-form.component.css'],
  providers: [UploadComponent, DatePipe]
})

export class ActualiteFormComponent implements OnInit {

  categories: Categorie[];
  categoriesSubscription: Subscription;
  actualiteForm : FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUrlDescription: String[];
  fileUploaded = false;
  fileUploadeddescription = false;
  myDate = new Date();

  constructor(private formBuilder: FormBuilder,
              private actualitesService: ActualitesService,
              private categoriesService: CategoriesService,
              private uploadCPT: UploadComponent,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  

  initForm(){
      this.actualiteForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      categorie : ['', Validators.required],
      introduction : ['', Validators.required],
      descriptions: this.formBuilder.array([
        this.addDescriptionFormGroup()
      ])
    });

    this.categoriesSubscription = this.categoriesService.categoriesSubject.subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      }
    );
    this.categoriesService.getCategories();
  }


  addDescription(){
    this.addDescriptionArray.push(this.addDescriptionFormGroup());
  }

  addParagraphe(){
    this.addParagrapheArray.push(this.addParagrapheFormGroup())
  }

  removeDescription(index){
    this.addDescriptionArray.removeAt(index);
  }

  removeParagraphe(index){
    this.addParagrapheArray.removeAt(index);
  }

  submitHandler(){
    console.log(this.actualiteForm.value);
    this.onSaveActualite();
  }

  get addDescriptionArray () {
    return <FormArray>this.actualiteForm.get('descriptions');
  }

  get addParagrapheArray (){
    return <FormArray>this.actualiteForm.get('paragraphes');
  }

  addDescriptionFormGroup(): FormGroup {
    return this.formBuilder.group({
      titleDescription: ['', Validators.required],
      libelleDescription: ['', Validators.required],
      photoDescription: [''],
    });
  }

  addParagrapheFormGroup(): FormGroup {
    return this.formBuilder.group({
      titleParagraphe: ['', Validators.required],
      libelleParagraphe: ['', Validators.required],
    });
  }

  onSaveActualite(){
    const title = this.actualiteForm.get('title').value;
    const author = this.actualiteForm.get('author').value;
    const createAt = this.datePipe.transform(this.myDate, 'MM-yy');
    const newActualite = new Actualite(title, author, createAt);
    this.fileUrl = this.uploadCPT.fileUrl;
    this.fileUrlDescription = this.uploadCPT.fileUrlDescription;
    if(this.fileUrl && this.fileUrl !== ''){
      newActualite.photo = this.fileUrl;
    }
    this.categoriesService.getSinglecategorie(this.actualiteForm.get('categorie').value).then(
      (categorie: Categorie) => {
        newActualite.categorie = categorie;
        newActualite.introduction = this.actualiteForm.get('introduction').value;
        for (let index = 0; index < this.fileUrlDescription.length; index++) {
          this.actualiteForm.get('descriptions').value[index].photoDescription = this.fileUrlDescription[index];      
        }
        newActualite.descriptions = this.actualiteForm.get('descriptions').value
        this.actualitesService.createNewActualite(newActualite);
        this.router.navigate(['/admin','actualites']);
      }
    ).catch( 
      (error) => {
        console.log(error);
    });
  }


  detectFiles(event, g){
    let file = event.target.files;
    this.fileIsUploading = true;
    this.uploadCPT.uploadSingle(file, g);
    if(this.uploadCPT.fileUrl !== ""){
      this.fileIsUploading = false;
      this.fileUploaded = true;
    }
  }

  detectFilesDescription(event, g){
    let file = event.target.files;
    this.fileIsUploading = true;
    this.uploadCPT.uploadSingleDescription(file, g);
    if(this.uploadCPT.fileUrl !== ""){
      this.fileIsUploading = false;
      this.fileUploadeddescription = true;
    }
  }
}
