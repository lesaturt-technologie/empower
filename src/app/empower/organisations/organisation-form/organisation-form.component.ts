import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmpowerService } from 'src/app/services/empower.service';
import { Router } from '@angular/router';
import { Membre } from 'src/app/models/organisation';
import { UploadComponent } from 'src/app/upload/upload.component';

@Component({
  selector: 'app-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.css']
})
export class OrganisationFormComponent implements OnInit {

  membreForm : FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor( private formBuilder : FormBuilder,
               private empowerService: EmpowerService,
               private uploadCPT: UploadComponent,
               private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.membreForm = this.formBuilder.group({
      profile: ['', Validators.required],
      name : ['', Validators.required],
      age : ['', Validators.required],
      nationalite:['', Validators.required],
      localisation: ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      phone : ['', Validators.required],
      poste : ['', Validators.required],
      facebook : ['', Validators.required],
      twitter : ['', Validators.required],
      instangram : ['', Validators.required],
      linkedin : ['', Validators.required], 
      resume : ['', Validators.required],
      experiences: this.formBuilder.array([
        this.addExperienceFormGroup()
      ]),
      educations: this.formBuilder.array([
        this.addEducationFormGroup()
      ]),
    })
  }

  onSaveMembre(){
    const name = this.membreForm.get('name').value;
    const age = this.membreForm.get('age').value;
    const email = this.membreForm.get('email').value;
    
    this.fileUrl = this.uploadCPT.fileUrl;
    const newMembre = new Membre(name,age,email);
    newMembre.experiences = this.membreForm.get('experiences').value;
    newMembre.educations = this.membreForm.get('educations').value;
    newMembre.poste = this.membreForm.get('poste').value;
    newMembre.nationalite = this.membreForm.get('nationalite').value;
    newMembre.resume = this.membreForm.get('resume').value;
    newMembre.localisation = this.membreForm.get('localisation').value;
    newMembre.phone = this.membreForm.get('phone').value; 
    newMembre.facebook = this.membreForm.get('facebook').value;
    newMembre.twitter = this.membreForm.get('twitter').value;
    newMembre.instagram = this.membreForm.get('instangram').value;

    if(this.fileUrl && this.fileUrl !== ''){
      newMembre.profile = this.fileUrl;
    }
    this.empowerService.createNewMembre(newMembre);
    //this.router.navigate(['/admin']);
  }

  addExperienceButtonClick (): void {
    (<FormArray>this.membreForm.get('experiences')).push(this.addExperienceFormGroup());
  }

  addExperienceFormGroup(): FormGroup {
    return this.formBuilder.group({
      poste: ['', Validators.required],
      entreprise: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      resume: ['', Validators.required],
    });
  }

  addEducationButtonClick (): void {
    (<FormArray>this.membreForm.get('educations')).push(this.addEducationFormGroup());
  }

  addEducationFormGroup(): FormGroup {
    return this.formBuilder.group({
      diplome: ['', Validators.required],
      etablissement: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      resume: ['', Validators.required],
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

}
