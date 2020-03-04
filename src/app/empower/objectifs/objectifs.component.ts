import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objectifs',
  templateUrl: './objectifs.component.html',
  styleUrls: ['./objectifs.component.css']
})
export class ObjectifsComponent implements OnInit {
  @Input() objectif;
  edit: boolean = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onViewObjectif(id: number){
    this.router.navigate(['/empower','objectif','detail']);
  }

}
