import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmpowerService } from 'src/app/services/empower.service';
import { Router } from '@angular/router';
import { UploadComponent } from 'src/app/upload/upload.component';
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/models/mission'

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})
export class MissionFormComponent implements OnInit {

  @Input() edit
  mission;
  missionForm : FormGroup;
  MissionsSubscription: Subscription;
  fileIsUploading;
  fileUploaded;
  fileUrl;
  cover;
  fileUrlMission;

  constructor(
              private formBuilder: FormBuilder,
              private empowerService: EmpowerService,
              private router: Router,
              private uploadCPT: UploadComponent) { }


  ngOnInit() {
    alert(this.edit)
    this.initForm()
    this.getMission()
  }

  initForm(){
    this.missionForm = this.formBuilder.group({
      profile: [''],
      cover: [''],
      libelle1 : ['', Validators.required],
      libelle2 : ['', Validators.required],
      resume : ['', Validators.required],
      sousmissions: this.formBuilder.array([
        this.addSousMissionFormGroup()
      ])
    });
  }

  addSubMission(){
    this.addSousMissionArray.push(this.addSousMissionFormGroup());
  }

  get addSousMissionArray () {
    return <FormArray>this.missionForm.get('sousmissions');
  }

  addSousMissionFormGroup(): FormGroup {
    return this.formBuilder.group({
      photo : [''],
      title: [''],
      subtitle: [''],
      resume: [''],
    });
  }

  getMission(){
    this.MissionsSubscription = this.empowerService.missionsSubject.subscribe(
      (Missions: Mission[]) => {
        this.mission = Missions;
      }
    );
    this.empowerService.getMissions();
    this.empowerService.emitMissions();
  }

  

  onSaveMission(){
    const libelle1 = this.missionForm.get('libelle1').value;
    const libelle2 = this.missionForm.get('libelle2').value;
    const resume = this.missionForm.get('resume').value;
    this.fileUrl = this.uploadCPT.fileUrl;
    this.cover = this.uploadCPT.cover;
    this.fileUrlMission = this.uploadCPT.fileUrlDescription;
    const newMission = new Mission(libelle1 , libelle2, resume)
      for (let index = 0; index < this.fileUrlMission.length; index++) {
        this.missionForm.get('sousmissions').value[index].photo = this.fileUrlMission[index];      
       }
    newMission.sousmissions = this.missionForm.get('sousmissions').value;
    if(this.fileUrl && this.fileUrl !== ''){
      newMission.profile = this.fileUrl;
    }
    if(this.cover && this.cover !== ''){
      newMission.cover = this.cover;
    }
    console.log(newMission.sousmissions)
    this.empowerService.saveMissions(newMission);
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

  detectFilesMission(event, g){
    let file = event.target.files;
    this.fileIsUploading = true;
    this.uploadCPT.uploadSingleDescription(file, g);
    if(this.uploadCPT.fileUrl !== ""){
      this.fileIsUploading = false;
    }
  }

}
