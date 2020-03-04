import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UploadComponent } from 'src/app/upload/upload.component';
import { EmpowerService } from 'src/app/services/empower.service';
import { Layout } from 'src/app/models/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Input() editLayout;
  fileIsUploading;
  fileUploading;
  fileUrl;
  cover;
  layout;
  layoutSubscription: Subscription;
  fileUploaded : boolean = false;
  LayoutForm: FormGroup;

  constructor(private empowerService: EmpowerService,
              private formBuilder: FormBuilder,
              private uploadCPT: UploadComponent) { }

  ngOnInit() {
    this.LayoutFunction();
    this.getLayout();
  }

  getLayout(){
    this.layoutSubscription = this.empowerService.layoutSubject.subscribe(
      (layout: Layout[]) => {
        this.layout = layout;
      }
    );
    this.empowerService.getLayout();
    this.empowerService.emitLayout();
  }

  LayoutFunction(){
    this.LayoutForm = this.formBuilder.group({
      navBarResume : ['', Validators.required],
      bannerResume : ['', Validators.required],
      videoResume: ['', Validators.required],
      navBarFile : ['', Validators.required],
      bannerFile : ['', Validators.required],
      videoFile: ['', Validators.required],
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

  onSaveLayout(){
    const navBarResume = this.LayoutForm.get('navBarResume').value;
    const bannerResume = this.LayoutForm.get('bannerResume').value;
    const videoResume = this.LayoutForm.get('videoResume').value;
    this.fileUrl = this.uploadCPT.fileUrl;
    this.cover = this.uploadCPT.cover;
    const newLayout = new Layout(navBarResume , bannerResume, videoResume)
    if(this.fileUrl && this.fileUrl !== ''){
      newLayout.navBarFile = this.fileUrl;
    }
    if(this.cover && this.cover !== ''){
      newLayout.bannerFile = this.cover;
    }
    newLayout.videoFile = this.LayoutForm.get('videoFile').value;
    this.empowerService.createLayout(newLayout);
    this.editLayout = false;
  }

}
