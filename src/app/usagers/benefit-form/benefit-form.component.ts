import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UsagersService } from 'src/app/services/usagers.service';
import { UploadComponent } from 'src/app/upload/upload.component';
import { Router } from '@angular/router';
import { Benefit } from 'src/app/models/benefit';

@Component({
  selector: 'app-benefit-form',
  templateUrl: './benefit-form.component.html',
  styleUrls: ['../usagers.component.css']
})
export class BenefitFormComponent implements OnInit {

  
  benefitForm : FormGroup;
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
    this.benefitForm = this.formBuilder.group({
      title: ['', Validators.required],
      introduction : ['', Validators.required],
      descriptions: this.formBuilder.array([
        this.adddescriptionsFormGroup()
      ])
    })
  }

  get adddescriptionsArray () {
    return <FormArray>this.benefitForm.get('descriptions');
  }

  addCitation(){
    this.adddescriptionsArray.push(this.adddescriptionsFormGroup());
  }


  adddescriptionsFormGroup(): FormGroup {
    return this.formBuilder.group({
      icon: ['', Validators.required],
      titre: ['', Validators.required],
      resume: ['', Validators.required],
    });
  }

  fileUploadeddescriptions(event, g){
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

  detectFilesDescriptions(event, g){
    let file = event.target.files;
    this.fileIsUploading = true;
    this.uploadCPT.uploadSingleDescription(file, g);
    if(this.uploadCPT.fileUrl !== ""){
      this.fileIsUploading = false;
      this.fileUploadeddescription = true;
    }
  }

  onSaveBenefit(){
    const title = this.benefitForm.get('title').value;
    const introduction = this.benefitForm.get('introduction').value;
    const newBenefit = new Benefit(title, introduction);
    this.fileUrl = this.uploadCPT.fileUrl;
    this.fileUrlDescription = this.uploadCPT.fileUrlDescription;
    newBenefit.descriptions = this.benefitForm.get('descriptions').value
    this.usagersService.updateusagersBenefit(newBenefit)
  }

}
