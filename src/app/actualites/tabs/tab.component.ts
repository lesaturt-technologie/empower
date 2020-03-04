import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-tab',
  styles: [
    `
    .pane{
      padding: 1em;
    }
    .tab01 .nav-link.active::after {
      content: "";
      display: block;
      position: absolute;
      background-color: #fff;
      width: 7px;
      height: 7px;
      border-left: 1px solid #d5d5d5;
      border-bottom: 1px solid #d5d5d5;
      left: calc(50% - 5px);
      bottom: -5px;
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
  }
  `
  ],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {

  @Input('tabTitle') title: string;
  @Input() active = false;

}
