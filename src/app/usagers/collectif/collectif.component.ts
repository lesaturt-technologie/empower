import { Component, OnInit } from '@angular/core';
import { Collectif } from 'src/app/models/collectif';
import { UsagersService } from 'src/app/services/usagers.service';

@Component({
  selector: 'app-collectif',
  templateUrl: './collectif.component.html',
  styleUrls: ['../usagers.component.css']
})
export class CollectifComponent implements OnInit {

  collectifinfos;
  constructor(private usagersService: UsagersService) { }

  ngOnInit() {
    this.usagersService.getUsagerscollectif().then(
      (collectif: Collectif) => {
        this.collectifinfos = collectif;
      })
  }

}
