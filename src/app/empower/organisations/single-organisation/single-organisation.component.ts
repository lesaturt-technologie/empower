import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membre } from 'src/app/models/organisation';
import { EmpowerService } from 'src/app/services/empower.service';

@Component({
  selector: 'app-single-organisation',
  templateUrl: './single-organisation.component.html',
  styleUrls: ['../../objectifs/objectif-detail/objectif-detail.component.css']
})
export class SingleOrganisationComponent implements OnInit {

  membre: Membre;

constructor(private route: ActivatedRoute,
            private empowerService: EmpowerService,
            private router: Router) { }

ngOnInit() {
  this.membre = new Membre('','','');
  const id = this.route.snapshot.params['id'];
  this.empowerService.getSingleMembre(+id).then(
    (membre: Membre) => {
      this.membre = membre;
      console.log(this.membre);
    }
  );
}

onBack(){
  this.router.navigate(['admin']);
}

}
