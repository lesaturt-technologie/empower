import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'empower';
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyBHiRt-NmDsdlQ7XcO5EykDzmGYEKtIRJc",
      authDomain: "empower-8e604.firebaseapp.com",
      databaseURL: "https://empower-8e604.firebaseio.com",
      projectId: "empower-8e604",
      storageBucket: "empower-8e604.appspot.com",
      messagingSenderId: "167763435271",
      appId: "1:167763435271:web:836307ea1391a1a19a6fa2",
      measurementId: "G-H18LRTCWCY"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
