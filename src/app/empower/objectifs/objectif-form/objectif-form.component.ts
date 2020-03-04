import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmpowerService } from 'src/app/services/empower.service';
import { Router } from '@angular/router';
import { Objectif } from 'src/app/models/objectifs';
import { UploadComponent } from 'src/app/upload/upload.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-objectif-form',
  templateUrl: './objectif-form.component.html',
  styleUrls: ['./objectif-form.component.css'],
  providers: [UploadComponent, ]
})
export class ObjectifFormComponent implements OnInit {
  @Input() edit
  objectif;
  ObjectifForm : FormGroup;
  objectifsSubscription: Subscription;
  fileIsUploading;
  fileUploaded;
  fileUrl;
  cover;

  constructor(
              private formBuilder: FormBuilder,
              private empowerService: EmpowerService,
              private router: Router,
              private uploadCPT: UploadComponent) { }


  ngOnInit() {
    this.initForm()
    this.getObjectif()
  }

  initForm(){
    this.ObjectifForm = this.formBuilder.group({
      profile: ['', Validators.required],
      cover: ['', Validators.required],
      libelle1 : ['', Validators.required],
      libelle2 : ['', Validators.required],
      resume : ['', Validators.required],
      sousobjectifs: this.formBuilder.array([
        this.addSousObjectifFormGroup()
      ])
    });
  }

  addSubObjectif(){
    this.addSousObjectifArray.push(this.addSousObjectifFormGroup());
  }

  get addSousObjectifArray () {
    return <FormArray>this.ObjectifForm.get('sousobjectifs');
  }

  addSousObjectifFormGroup(): FormGroup {
    return this.formBuilder.group({
      categorie : [''],
      title: [''],
      subtitle: [''],
      resume: [''],
    });
  }

  getObjectif(){
    this.objectifsSubscription = this.empowerService.objectifsSubject.subscribe(
      (objectifs: Objectif[]) => {
        this.objectif = objectifs;
      }
    );
    this.empowerService.getObjectifs();
    this.empowerService.emitObjectifs();
  }

  

  onSaveObjectif(){
    const libelle1 = this.ObjectifForm.get('libelle1').value;
    const libelle2 = this.ObjectifForm.get('libelle2').value;
    const resume = this.ObjectifForm.get('resume').value;
    this.fileUrl = this.uploadCPT.fileUrl;
    this.cover = this.uploadCPT.cover;
    const newObjectif = new Objectif(libelle1 , libelle2, resume)
    if(!this.ObjectifForm.get('sousobjectifs').value){
      newObjectif.sousobjectifs = this.ObjectifForm.get('sousobjectifs').value;
    }
    if(this.fileUrl && this.fileUrl !== ''){
      newObjectif.profile = this.fileUrl;
    }
    if(this.cover && this.cover !== ''){
      newObjectif.cover = this.cover;
    }
    this.empowerService.saveObjectifs(newObjectif);
    this.edit = false;
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
}
