import { Component, ViewChild, Input } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
  <div class="tab01 p-b-20">
    <div *ngFor="let groupe of actualites | groupBy:'categorie.groupe' | pairs; let g = index">
        <my-tabs *ngIf="filter === groupe[0] || filter !=='commissions'" [groupe]="groupe" [g]="g" class="tab-content p-t-35">
            <div *ngFor="let sousgroupe of actualites | groupBy:'categorie.name' | pairs;">
                <my-tab *ngIf="sousgroupe[1][0].categorie.groupe === groupe[0]" [tabTitle]="sousgroupe[0]">
                    <div class="row">
                        <div class="col-sm-6 p-r-25 p-r-15-sr991">
                            <div *ngFor="let val of sousgroupe[1].slice(0, 6); last as isLast; let v = index;">
                                <!-- Item post -->	
                                <div class="m-b-30" *ngIf="val.categorie.name === sousgroupe[0] && isLast && val.categorie.groupe === groupe[0]">
                                <a (click)="onViewActualite(v)" class="wrap-pic-w hov1 trans-03">
                                    <img [src]="val.photo" alt="IMG">
                                </a>
                                <div class="p-t-20">
                                    <h5 class="p-b-5">
                                        <a (click)="onViewActualite(v)" class="f1-m-3 cl2 hov-cl10 trans-03">
                                            {{val.title}} 
                                        </a>
                                    </h5>
                                    <span class="f1-s-6 cl4 trans-03">
                                        {{val.introduction | slice : 0 : 300}} ...
                                    </span>
                                    <br/>
                                    <span class="cl8">
                                        <a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">
                                            {{val.categorie.name}}
                                        </a>

                                        <span class="f1-s-3 m-rl-3">
                                            -
                                        </span>

                                        <span class="f1-s-3">
                                            {{val.createAt}}
                                        </span>
                                        <span class="f1-s-3 m-rl-3">
                                            by
                                        </span>

                                        <span class="f1-s-3">
                                            {{val.author}}
                                        </span>
                                    </span>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 p-r-25 p-r-15-sr991">
                                                        <!-- Item post -->	
                                                        <div *ngFor="let val of sousgroupe[1].slice(0, 5); last as isLast; let a = index;">
                                                            <div class="flex-wr-sb-s m-b-30" *ngIf="val.categorie.name === sousgroupe[0] && !isLast && val.categorie.groupe === groupe[0]">
                                                        <a (click)="onViewActualite(a)" class="size-w-1 wrap-pic-w hov1 trans-03">
                                                            <img [src]="val.photo" [alt]="val.title">
                                                        </a>
            
                                                        <div class="size-w-2">
                                                            <h5 class="p-b-5">
                                                                <a (click)="onViewActualite(a)" class="f1-s-5 cl3 hov-cl10 trans-03">
                                                                    {{val.title | slice : 0 : 50}} ... {{val.title | slice:val.title.length - 15 : val.title.length}}
                                                                </a>
                                                            </h5>
            
                                                            <span class="cl8">
                                                                <a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">
                                                                    {{val.categorie.name}}
                                                                </a>
            
                                                                <span class="f1-s-3 m-rl-3">
                                                                    -
                                                                </span>
            
                                                                <span class="f1-s-3">
                                                                    {{val.createAt}}
                                                                </span>
                                                            </span>
                                                        </div>
                                                            </div>
                                                        </div>
                                                </div>
                    </div>
                </my-tab>
            </div>
        </my-tabs>
    </div>
</div>
  `
})
export class TabsactualiteComponent {
    @Input() actualites;
    @Input() filter;

    constructor(private router : Router){}

    onViewActualite(id: number){
        this.router.navigate(['/actualites','view', id]);
      }
}