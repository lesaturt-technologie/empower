import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsagersService } from 'src/app/services/usagers.service';
import { Benefit } from 'src/app/models/benefit';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['../usagers.component.css']
})
export class BenefitComponent implements OnInit {
  benetinfos;
  benefitSubscription: Subscription;
  constructor(private usagersService: UsagersService) { }

  ngOnInit() {
    this.usagersService.getusagersBenefit().then(
      (benefit: Benefit) => {
        this.benetinfos = benefit;
      })
  }

}
