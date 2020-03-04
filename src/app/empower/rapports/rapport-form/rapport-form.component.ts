import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmpowerService } from 'src/app/services/empower.service';
import { UploadComponent } from 'src/app/upload/upload.component';
import { Rapport } from 'src/app/models/rapport';

@Component({
  selector: 'app-rapport-form',
  templateUrl: './rapport-form.component.html'
})
export class RapportFormComponent implements OnInit {
  @Input() editRapport;
  fileIsUploading;
  fileUploading;
  fileUrl;
  cover;
  fileUploaded : boolean = false;
  RapportForm: FormGroup;
  rapportsSubscription: Subscription;

  constructor(private empowerService: EmpowerService,
              private formBuilder: FormBuilder,
              private uploadCPT: UploadComponent) { }

  ngOnInit() {
    this.rapportFunction();
  }

  rapportFunction(){
    this.RapportForm = this.formBuilder.group({
      fichier: ['', Validators.required],
      libelle : ['', Validators.required],
      resume : ['', Validators.required],
      periode: ['', Validators.required],
      cover: ['', Validators.required],
    });
  }

  detectFilesPdf(event, g){
    let file = event.target.files;
    this.fileIsUploading = true;
    this.uploadCPT.uploadSingle(file, g);
    if(this.uploadCPT.fileUrl !== ""){
      this.fileIsUploading = false;
      this.fileUploaded = true;
    }
  }

  onSaveRapport(){
    const libelle = this.RapportForm.get('libelle').value;
    const resume = this.RapportForm.get('resume').value;
    const periode = this.RapportForm.get('periode').value;
    this.fileUrl = this.uploadCPT.fileUrl;
    this.cover = this.uploadCPT.cover;
    const newRapport = new Rapport(libelle , resume, periode)
    if(this.fileUrl && this.fileUrl !== ''){
      newRapport.fichier = this.fileUrl;
      newRapport.cover = this.cover;
    }
    this.empowerService.createNewRapport(newRapport);
    this.editRapport = false;
  }

}
