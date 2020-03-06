import { Component, OnInit } from '@angular/core';
import { UsagersService } from 'src/app/services/usagers.service';
import { Commission } from 'src/app/models/commission';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['../usagers.component.css']
})
export class CommissionComponent implements OnInit {
  currentOrientation = 'horizontal';
  commissioninfos;
  constructor(private usagersService: UsagersService) { }

  ngOnInit() {
    this.usagersService.getUsagersCommission().then(
      (commission: Commission) => {
        this.commissioninfos = commission;
      })
  }

}
