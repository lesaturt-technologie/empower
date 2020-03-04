import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationactualites',
  templateUrl: './navigationactualite.html'
})
export class NavigationsactualitesComponent {
    @Input() actualites;

    constructor(private router : Router){}

    onViewActualite(id: number){
        this.router.navigate(['/actualites','view', id]);
      }
}
