import { Component, OnInit, Input } from '@angular/core';
import { EmpowerService } from 'src/app/services/empower.service';
import { Subscription } from 'rxjs';
import { Rapport } from 'src/app/models/rapport';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css']
})

@Pipe({
  name: 'safeUrl',
})

export class RapportsComponent implements OnInit {
@Input() layout;
rapports: Rapport[];
rapportForm;
rapport;
url;
rapportsSubscription: Subscription;

  constructor( private sanitizer: DomSanitizer,private empowerService: EmpowerService, private modalService: NgbModal) { }
  
  

  ngOnInit() {
    this.rapportsSubscription = this.empowerService.rapportsSubject.subscribe(
      (rapports: Rapport[]) => {
        this.rapports = rapports
      }
    );
    this.empowerService.getRapports();
    this.empowerService.emitRapports();
  }

  open(content, i) {
    this.empowerService.getSingleRapport(+i).then(
      (rapport: Rapport) => {
        this.rapport = rapport;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(rapport.fichier)
      }
    );
    this.modalService.open(content, { size: 'lg' });
  }
}
