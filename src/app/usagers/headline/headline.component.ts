import { Component, OnInit } from '@angular/core';
import { UsagersService } from 'src/app/services/usagers.service';
import { Headline } from 'src/app/models/headline';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['../usagers.component.css']
})
export class HeadlineComponent implements OnInit {
  headinfos;
  headlineSubscription: Subscription;
  constructor(private usagersService: UsagersService) { }

  ngOnInit() {
    this.usagersService.getusagersHeadline().then(
      (headline: Headline) => {
        this.headinfos = headline;
      })
  }

}
