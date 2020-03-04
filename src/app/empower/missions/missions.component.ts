import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html'
})
export class MissionsComponent implements OnInit {

  @Input() mission;
  edit: boolean = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onViewMission(id: number){
    this.router.navigate(['/empower','mission','detail']);
  }

}
