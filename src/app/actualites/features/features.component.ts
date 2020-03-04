import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/models/feature';
import { Subscription } from 'rxjs';
import { FeaturesService } from 'src/app/services/features.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html'
})
export class FeaturesComponent implements OnInit {

  features: Feature[];
  featuresSubscription: Subscription;
  status = false;
  SingleFeature;

  constructor(private featuresService: FeaturesService, private modalService: NgbModal) { }

  ngOnInit() {
      this.featuresSubscription = this.featuresService.featuresSubject.subscribe(
        (features: Feature[]) => {
          this.features = features;
        }
      );
      this.featuresService.getfeatures();
      this.featuresService.emitfeatures();
  }

  PublierFeatures(feature: Feature, id){
    feature.status = "publier";
    if(this.featuresService.updateFeatures(feature, id)){
      this.status = true;
    };
  }

  

  onDeletefeature(feature: Feature){
   // this.featuresService.removefeature(feature);
  }

  ngOnDestroy(){
    this.featuresSubscription.unsubscribe();
  }

}
