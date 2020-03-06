import { Component, OnInit, Input } from '@angular/core';
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
  commissioninfos;
  commissionForm : FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUrlPerspective: String[];
  fileUrlOutil: String[];
  fichierOutil: String[];
  fileUploaded = false;
  fileUploadeddescription = false;
  myDate = new Date();

  constructor(private formBuilder: FormBuilder,
              private usagersService: UsagersService,
              private uploadCPT: UploadComponent,
              private router: Router) { }

  ngOnInit() {
    this.usagersService.getUsagersCommission().then(
      (commission: Commission) => {
        this.commissioninfos = commission;
      })
    this.initForm()
  }
  
  initForm(){
    this.commissionForm = this.formBuilder.group({
      profile: [''],
      titre: ['', Validators.required],
      introduction: ['', Validators.required],
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

  editvaluetitreOutil(e, i){
    this.commissioninfos.outils[i].titre = e.srcElement.value
  }

  editvalueresumeOutil(e, i){
    this.commissioninfos.outils[i].resume = e.srcElement.value
  }

  editvaluegroupeOutil(e, i){
    this.commissioninfos.outils[i].groupe = e.srcElement.value
  }

  deleteOutil(i, item){
    this.commissioninfos.outils.splice(i,1)
  }

  addoutilsFormGroup(): FormGroup {
    return this.formBuilder.group({
      profile: [''],
      fichier: [''],
      titre: [''],
      resume: [''],
      groupe: [''],

    });
  }

 

  editvaluetitrePerspective(e, i){
    this.commissioninfos.perspectives[i].titre = e.srcElement.value
  }

  editvalueresumePerspective(e, i){
    this.commissioninfos.perspectives[i].resume = e.srcElement.value
  }

  deletePerspective(i){
    this.commissioninfos.perspectives.splice(i,1)
  }

  addperspectivesFormGroup(): FormGroup {
    return this.formBuilder.group({
      profile: [''],
      titre: [''],
      resume: [''],
    });
  }

  addPerspective(){
    this.addperspectivesArray.push(this.addperspectivesFormGroup());
  }

  addObjectif(){
    this.addobjectifsArray.push(this.addobjectifsFormGroup());
  }

  editvaluetitreObjectif(e, i){
    this.commissioninfos.objectif[i].titre = e.srcElement.value
  }

  editvalueresumeObjectif(e, i){
    this.commissioninfos.objectif[i].resume = e.srcElement.value
  }

  deleteObjectif(i){
    this.commissioninfos.objectifs.splice(i,1)
  }
  addobjectifsFormGroup(): FormGroup {
    return this.formBuilder.group({
      titre: [''],
      resume: [''],
    });
  }

  addModalite(){
    this.addmodalitesArray.push(this.addmodalitesFormGroup());
  }


  addOutil(){
    this.addoutilsArray.push(this.addoutilsFormGroup());
  }

  editvaluetitreModalite(e, i){
    this.commissioninfos.modalites[i].titre = e.srcElement.value
  }

  deleteModalite(i, item){
    this.commissioninfos.modalites.splice(i,1)
  }

  addmodalitesFormGroup(): FormGroup {
    return this.formBuilder.group({
      titre: [''],
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
    const titre = this.commissionForm.get('titre').value;
    const introduction = this.commissionForm.get('introduction').value;
    const titreoutil = this.commissionForm.get('titreoutil').value;
    const resumeoutil = this.commissionForm.get('resumeoutil').value;
    const titremodalite = this.commissionForm.get('titremodalite').value;
    const resumemodalite = this.commissionForm.get('resumemodalite').value;
    const newcommission = new Commission(titre, introduction,titreoutil,resumeoutil, titremodalite, resumemodalite) ;
    this.fileUrl = this.uploadCPT.fileUrl;
    this.fileUrlOutil = this.uploadCPT.fileUrlOutil;
    this.fichierOutil = this.uploadCPT.fichierOutil;
    if(this.fileUrl && this.fileUrl !== ''){
      newcommission.profile = this.fileUrl;
    }
    if(this.fileUrlOutil){
      for (let index = 0; index < this.fileUrlOutil.length; index++) {
        this.commissionForm.get('outils').value[index].profile = this.fileUrlOutil[index]; 
      }
    }
     
    if(this.fichierOutil){
      for (let index = 0; index < this.fileUrlOutil.length; index++) {
        this.commissionForm.get('outils').value[index].fichier = this.fichierOutil[index]; 
      }
    }
      if(this.commissionForm.get('objectifs').touched){
        let id = this.commissioninfos.objectifs.length
        for (let index = 0; index < this.commissionForm.get('objectifs').value.length; index++) {
          this.commissioninfos.objectifs[id] = this.commissionForm.get('objectifs').value[index]
           id = id+1
        }
      }

      if(this.commissionForm.get('modalites').touched){
        let id = this.commissioninfos.modalites.length
        for (let index = 0; index < this.commissionForm.get('modalites').value.length; index++) {
          this.commissioninfos.modalites[id] = this.commissionForm.get('modalites').value[index]
           id = id+1
        }
      }

      if(this.commissionForm.get('perspectives').touched){
        let id = this.commissioninfos.perspectives.length
        for (let index = 0; index < this.commissionForm.get('perspectives').value.length; index++) {
          this.commissioninfos.perspectives[id] = this.commissionForm.get('perspectives').value[index]
           id = id+1
        }
      }

      if(this.commissionForm.get('outils').touched){
        let id = this.commissioninfos.outils.length
        for (let index = 0; index < this.commissionForm.get('outils').value.length; index++) {
          this.commissioninfos.outils[id] = this.commissionForm.get('outils').value[index]
           id = id+1
        }
      }

    this.commissionForm.reset()
    this.usagersService.updateUsagersCommission(this.commissioninfos)
  }

}
