import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { UsagersService } from 'src/app/services/usagers.service';
import { UploadComponent } from 'src/app/upload/upload.component';
import { Router } from '@angular/router';
import { Headline } from 'src/app/models/headline';

@Component({
  selector: 'app-headline-form',
  templateUrl: './headline-form.component.html',
  styleUrls: ['../usagers.component.css']
})
export class HeadlineFormComponent implements OnInit {

  headlineForm : FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUrlDescription: String[];
  fileUploaded = false;
  fileUploadeddescription = false;
  myDate = new Date();

  constructor(private formBuilder: FormBuilder,
              private usagersService: UsagersService,
              private uploadCPT: UploadComponent,
              private router: Router) { }

  ngOnInit() {
    this.initForm()
  }
  
  initForm(){
    this.headlineForm = this.formBuilder.group({
      titre: ['', Validators.required],
      introduction : ['', Validators.required],
      textes: this.formBuilder.array([
        this.addCitationFormGroup()
      ])
    })
  }

  get addCitationArray () {
    return <FormArray>this.headlineForm.get('textes');
  }

  addCitation(){
    this.addCitationArray.push(this.addCitationFormGroup());
  }


  addCitationFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      titre: ['', Validators.required],
      resume: ['', Validators.required],
      profile: [''],
    });
  }

  fileUploadedCitation(event, g){
    let file = event.target.files;
    this.fileIsUploading = true;
    this.uploadCPT.uploadSingleDescription(file, g);
    if(this.uploadCPT.fileUrl !== ""){
      this.fileIsUploading = false;
      this.fileUploadeddescription = true;
    }
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

  detectFilesCitation(event, g){
    let file = event.target.files;
    this.fileIsUploading = true;
    this.uploadCPT.uploadSingleDescription(file, g);
    if(this.uploadCPT.fileUrl !== ""){
      this.fileIsUploading = false;
      this.fileUploadeddescription = true;
    }
  }

  onSaveHeadline(){
    const titre = this.headlineForm.get('titre').value;
    const introduction = this.headlineForm.get('introduction').value;
    const newHeadline = new Headline(titre, introduction);
    this.fileUrl = this.uploadCPT.fileUrl;
    this.fileUrlDescription = this.uploadCPT.fileUrlDescription;
    if(this.fileUrl && this.fileUrl !== ''){
      newHeadline.cover = this.fileUrl;
    }
    if(this.fileUrlDescription){
      for (let index = 0; index < this.fileUrlDescription.length; index++) {
        this.headlineForm.get('textes').value[index].profile = this.fileUrlDescription[index]; 
      }
    }
    newHeadline.textes = this.headlineForm.get('textes').value
    this.usagersService.updateusagersHeadline(newHeadline)
  }
  
}

