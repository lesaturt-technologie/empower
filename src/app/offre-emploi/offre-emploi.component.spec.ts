import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreEmploiComponent } from './offre-emploi.component';

describe('OffreEmploiComponent', () => {
  let component: OffreEmploiComponent;
  let fixture: ComponentFixture<OffreEmploiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffreEmploiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
