import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Upload } from '../models/upload';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor() { }
  
  data;

  private basePath:string = '/uploads';

   
  public pushUpload(upload: Upload){
    return new Promise(
      (resolve, reject) => {
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>  {
            // upload in progress
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            // upload failed
            console.log('Erreur de chargement:' + error)
            reject(error)
          },
          () => {
            // upload success
             uploadTask.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                alert(downloadUrl)
                upload.url = downloadUrl;
                resolve(downloadUrl)
              }
            );
            upload.name = upload.file.name
          }
        );
      }
    )
    
  }


  deleteUpload(index:string) {
    const storageRef = firebase.storage().refFromURL(index);
      storageRef.delete().then(
        () => {
          console.log('photo supprimer');
        }
      ).catch(
          (error) => {
            console.log('Fichier non trouvé : ' + error);
          }
      );
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
   // return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

}
