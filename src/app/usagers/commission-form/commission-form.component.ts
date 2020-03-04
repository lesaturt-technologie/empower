import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UsagersService } from 'src/app/services/usagers.service';
import { UploadComponent } from 'src/app/upload/upload.component';
import { Router } from '@angular/router';
import { Commission } from 'src/app/models/commission';

@Component({
  selector: 'app-commission-form',
  templateUrl: './commission-form.component.html',
  styleUrls: ['../usagers.component.css']
})
export class CommissionFormComponent implements OnInit {

  commissionForm : FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUrlPerspective: String[];
  fileUrlOutil: String[];
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
    this.commissionForm = this.formBuilder.group({
      profile: ['', Validators.required],
      titre: ['', Validators.required],
      introduction : ['', Validators.required],
      titreoutil: ['', Validators.required],
      resumeoutil: ['', Validators.required],
      titremodalite: ['', Validators.required],
      resumemodalite: ['', Validators.required],
      objectifs: this.formBuilder.array([
        this.addobjectifsFormGroup()
      ]),
      modalites: this.formBuilder.array([
        this.addmodalitesFormGroup()
      ]),
      perspectives: this.formBuilder.array([
        this.addperspectivesFormGroup()
      ]),
      outils: this.formBuilder.array([
        this.addoutilsFormGroup()
      ])
    })
  }

  get addmodalitesArray () {
    return <FormArray>this.commissionForm.get('modalites');
  }
  get addobjectifsArray () {
    return <FormArray>this.commissionForm.get('objectifs');
  }

  get addperspectivesArray () {
    return <FormArray>this.commissionForm.get('perspectives');
  }

  get addoutilsArray () {
    return <FormArray>this.commissionForm.get('outils');
  }

  addOutils(){
    this.addoutilsArray.push(this.addoutilsFormGroup());
  }


  addoutilsFormGroup(): FormGroup {
    return this.formBuilder.group({
      profile: [''],
      titre: ['', Validators.required],
      resume: ['', Validators.required],
      groupe: ['', Validators.required],

    });
  }


  addperspectivesFormGroup(): FormGroup {
    return this.formBuilder.group({
      profile: ['', Validators.required],
      titre: ['', Validators.required],
      resume: ['', Validators.required],
    });
  }

  addPerspective(){
    this.addperspectivesArray.push(this.addperspectivesFormGroup());
  }

  addObjectif(){
    this.addobjectifsArray.push(this.addobjectifsFormGroup());
  }

  addobjectifsFormGroup(): FormGroup {
    return this.formBuilder.group({
      titre: ['', Validators.required],
      resume: ['', Validators.required],
    });
  }

  addModalite(){
    this.addmodalitesArray.push(this.addmodalitesFormGroup());
  }


  addOutil(){
    this.addoutilsArray.push(this.addoutilsFormGroup());
  }


  addmodalitesFormGroup(): FormGroup {
    return this.formBuilder.group({
      titre: ['', Validators.required],
    });
  }

  fileUploadedmodalites(event, g){
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

  detectFilesmodalites(event, g){
    let file = event.target.files;
    this.fileIsUploading = true;
    this.uploadCPT.uploadSingleDescription(file, g);
    if(this.uploadCPT.fileUrl !== ""){
      this.fileIsUploading = false;
      this.fileUploadeddescription = true;
    }
  }

  onSaveCommission(){
    alert('bien')
    const titre = this.commissionForm.get('titre').value;
    const introduction = this.commissionForm.get('introduction').value;
    const titreoutil = this.commissionForm.get('titreoutil').value;
    const resumeoutil = this.commissionForm.get('resumeoutil').value;
    const titremodalite = this.commissionForm.get('titremodalite').value;
    const resumemodalite = this.commissionForm.get('resumemodalite').value;
    const newcommission = new Commission(titre, introduction,titreoutil,resumeoutil, titremodalite, resumemodalite) ;
    this.fileUrl = this.uploadCPT.fileUrl;
    this.fileUrlOutil = this.uploadCPT.fileUrlOutil;
    if(this.fileUrl && this.fileUrl !== ''){
      newcommission.profile = this.fileUrl;
    }
    if(this.fileUrlOutil){
      for (let index = 0; index < this.fileUrlOutil.length; index++) {
        this.commissionForm.get('outils').value[index].profile = this.fileUrlOutil[index]; 
      }
    }
    newcommission.modalites = this.commissionForm.get('modalites').value
    newcommission.objectifs = this.commissionForm.get('objectifs').value
    newcommission.perspectives = this.commissionForm.get('perspectives').value
    newcommission.outils = this.commissionForm.get('outils').value
    this.usagersService.updateUsagersCommission(newcommission)
  }

}
