import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjectifFormComponent } from '../empower/objectifs/objectif-form/objectif-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[ObjectifFormComponent]
})
export class AdminComponent implements OnInit {
  edit: boolean = false;
  editRapport: boolean = false;
  editLayout: boolean = false;
  constructor(private modalService: NgbModal, private objectifCPT: ObjectifFormComponent) { }

  ngOnInit() {
  }

  editer(){
    this.edit = true
  }

  editerRapport(){
    this.editRapport = true
  }

  editerLayout(){
    this.editLayout = true
  }
  
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
