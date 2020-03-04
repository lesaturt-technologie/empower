import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html'
})

export class NavigationsComponent implements OnInit {
  isAuth: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(){
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuth = true;
        }else{
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut (){
    this.authService.signOutUser();
  }


}
