import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationempower',
  templateUrl: './navigationempower.component.html'
})
export class NavigationempowerComponent {
@Input() layout;
  constructor(private router: Router) { }

  onViewActualite(id: number){
    this.router.navigate(['/actualites','view', id]);
  }
}
