import { Component, OnInit } from '@angular/core';
import { Upload } from '../models/upload';
import { UploadService } from '../services/upload.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent  {

    selectedFiles: FileList;
    fileUrl;
    cover;
    fileUrlDescription: Array<String> = [];
    fileUrlPerspective: Array<String> = [];
    fileUrlOutil: Array<String> = [];
    currentUpload: Upload;
  
    constructor(private upSvc: UploadService) { }
  
    detectFiles(event) {
        this.selectedFiles = event.target.files;
    }
  
    uploadSingle(selectedFiles, params){
      let file = selectedFiles.item(0)
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload).then(
        (url) => {
          switch (params) {
            case "fileUrl":
              this.fileUrl = url
              break;
            case "cover":
              this.cover = url
              break;
          }          
        }
      )
    }

    uploadSingleDescription(selectedFiles, params){
      let file = selectedFiles.item(0)
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload).then(
        (url: string) => {
          switch (params) {
            case "perspective":
              this.fileUrlPerspective.push(url);
              break;
            case "outil":
              alert(url)
              this.fileUrlOutil.push(url);
              break;
            default:
              this.fileUrlDescription.push(url);
              break;
          } 
        }
      ) 
    }
  
    uploadMulti(selectedFiles) {
      let files = selectedFiles
      let filesIndex = _.range(files.length)
      _.each(filesIndex, (idx) => {
        this.currentUpload = new Upload(files[idx]);
        return this.upSvc.pushUpload(this.currentUpload)}
      )
    }
  
  }
