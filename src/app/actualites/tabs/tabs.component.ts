import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';

import { TabComponent } from './tab.component';
import { Router } from '@angular/router';
//import { DynamicTabsDirective } from './dynamic-tabs.directive';

@Component({
  selector: 'my-tabs',
  template: `
    <div class="tab01-head how2 how2-cl1 bocl12 flex-s-c m-r-10 m-r-0-sr991">
    <!-- Brand tab -->
    <h3 class="f1-m-2 cl12 tab01-title" style="cursor:pointer;" (click)="onViewCategorie(g)">
      {{groupe[0]}}
    </h3>

    <ul class="nav nav-tabs">
        <li class="nav-item" *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a class="nav-link" class="btn btn-default nav-link">{{tab.title}}</a>
        </li>
        <li class="nav-item-more dropdown dis-none">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
          <i class="fa fa-ellipsis-h"></i>
        </a>

        <ul class="dropdown-menu">
          
        </ul>
      </li>
    </ul>
    <!--  -->
    <a href="category-01.html" class="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
      Toutes l'actualités
      <i class="fs-12 m-l-5 fa fa-caret-right"></i>
    </a>
  </div>
    
  <ng-content></ng-content>
  `,
  styles: [
    `
    .tab-close {
      color: gray;
      text-align: right;
      cursor: pointer;
    }
    `
  ]
})
export class TabsComponent {
  @Input() groupe;
  @Input() g;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor(private router: Router){}
  
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: TabComponent){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }

  onViewCategorie(g){
    const id = 2
    this.router.navigate(['/categories','view',g,'feat',id]);
  }

}
