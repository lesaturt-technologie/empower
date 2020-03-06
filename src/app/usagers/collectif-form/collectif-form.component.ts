import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { UsagersService } from 'src/app/services/usagers.service';
import { UploadComponent } from 'src/app/upload/upload.component';
import { Router } from '@angular/router';
import { Collectif } from 'src/app/models/collectif';

@Component({
  selector: 'app-collectif-form',
  templateUrl: './collectif-form.component.html',
  styleUrls: ['../usagers.component.css']
})
export class CollectifFormComponent implements OnInit {
  collectifinfos;
  collectifForm : FormGroup;
  fileIsUploading = false;
  fileUploadeddescription = false;
  fileUrlOutil;
  constructor(private formBuilder: FormBuilder,
    private usagersService: UsagersService,
    private uploadCPT: UploadComponent,
    private router: Router) { }

      ngOnInit() {
          this.usagersService.getUsagerscollectif().then(
              (collectif: Collectif) => {
                this.collectifinfos = collectif;
              })
                this.initForm()
            }

    initForm(){
      this.collectifForm = this.formBuilder.group({
        titre: ['', Validators.required],
        introduction: ['', Validators.required],
        paragraphes: this.formBuilder.array([
          this.addparagraphesFormGroup()
        ])
      })
    }

    addparagraphesFormGroup(): FormGroup {
      return this.formBuilder.group({
        profile: [''],
        titre: [''],
        soustitre: [''],
        resume: [''],
      });
    }

    get addparagraphesArray () {
      return <FormArray>this.collectifForm.get('paragraphes');
    }

    addParagraphe(){
      this.addparagraphesArray.push(this.addparagraphesFormGroup());
    }

    editvaluetitreparagraphe(e, i){
      this.collectifinfos.paragraphes[i].titre = e.srcElement.value
    }

    editvaluesoustitreparagraphe(e, i){
      this.collectifinfos.paragraphes[i].soustitre = e.srcElement.value
    }

    editvalueresumeparagraphe(e, i){
      this.collectifinfos.paragraphes[i].resume = e.srcElement.value
    }
  
    deleteParagraphe(i){
      this.collectifinfos.paragraphes.splice(i,1)
    }

    onSavecollectif(){
      const titre = this.collectifForm.get('titre').value;
      const introduction = this.collectifForm.get('introduction').value;
      const newcollectif = new Collectif(titre, introduction) ;
      this.fileUrlOutil = this.uploadCPT.fileUrlOutil;

      if(this.fileUrlOutil){
        for (let index = 0; index < this.fileUrlOutil.length; index++) {
          this.collectifForm.get('paragraphes').value[index].profile = this.fileUrlOutil[index]; 
        }
      }
       
        if(this.collectifForm.get('paragraphes').touched){
          if(this.collectifinfos){
            let id = this.collectifinfos.paragraphe.length
            for (let index = 0; index < this.collectifForm.get('paragraphes').value.length; index++) {
              this.collectifinfos.paragraphe[id] = this.collectifForm.get('paragraphes').value[index]
              id = id+1
            }
            this.usagersService.updateUsagersCollectif(this.collectifinfos)
          }else{
            newcollectif.paragraphe = this.collectifForm.get('paragraphes').value
            this.usagersService.updateUsagersCollectif(newcollectif)
          }
        }
  
      this.collectifForm.reset()
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
}
