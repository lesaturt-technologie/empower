import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgPipesModule} from 'ngx-pipes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ActualitesComponent } from './actualites/actualites.component';
import { PublicationsComponent } from './publications/publications.component';
import { OffreEmploiComponent } from './offre-emploi/offre-emploi.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { NavigationsComponent } from './navigations/navigations.component';
import { BanieresComponent } from './banieres/banieres.component';
import { ActualitesGeneralesComponent } from './actualites/actualites-generales/actualites-generales.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ActualiteListComponent } from './actualites/actualite-list/actualite-list.component';
import { SingleActualiteComponent } from './actualites/single-actualite/single-actualite.component';
import { ActualiteFormComponent } from './actualites/actualite-form/actualite-form.component';
import { AuthService } from './services/auth.service';
import { ActualitesService } from './services/actualites.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { CategoriesService } from './services/categories.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategorieFormComponent } from './categories/categorie-form/categorie-form.component';
import { EmpowerComponent } from './empower/empower.component';
import { ObjectifsComponent } from './empower/objectifs/objectifs.component';
import { MissionsComponent } from './empower/missions/missions.component';
import { OrganisationsComponent } from './empower/organisations/organisations.component';
import { RapportsComponent } from './empower/rapports/rapports.component';
import { CommissionsComponent } from './empower/commissions/commissions.component';
import { ObjectifDetailComponent } from './empower/objectifs/objectif-detail/objectif-detail.component';
import { OrganisationFormComponent } from './empower/organisations/organisation-form/organisation-form.component';
import { UploadComponent } from './upload/upload.component';
import { FeaturesComponent } from './actualites/features/features.component';
import { FeatureFormComponent } from './actualites/features/feature-form/feature-form.component';
import { TabsComponent } from './actualites/tabs/tabs.component';
import { TabComponent } from './actualites/tabs/tab.component';
import { TabsactualiteComponent } from './actualites/tabs/tabsactualite';
import { NavigationsactualitesComponent } from './navigations/navigationactualites';
import { SingleCategorieComponent } from './categories/single-categorie/single-categorie.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ObjectifFormComponent } from './empower/objectifs/objectif-form/objectif-form.component';
import { NgbdToastGlobal } from './toast/toast.component';
import { UploadService } from './services/upload.service';
import { MissionFormComponent } from './empower/missions/mission-form/mission-form.component';
import { MissionDetailComponent } from './empower/missions/mission-detail/mission-detail.component';
import { RapportFormComponent } from './empower/rapports/rapport-form/rapport-form.component';
import { SingleOrganisationComponent } from './empower/organisations/single-organisation/single-organisation.component';
import { LayoutComponent } from './empower/layout/layout.component';
import { NavigationempowerComponent } from './navigations/navigationempower.component';
import { FooterComponent } from './footer/footer.component';
import { UsagersComponent } from './usagers/usagers.component';
import { CulturesComponent } from './cultures/cultures.component';
import { PreventionsComponent } from './preventions/preventions.component';
import { HeadlineComponent } from './usagers/headline/headline.component';
import { HeadlineFormComponent } from './usagers/headline-form/headline-form.component';
import { BenefitFormComponent } from './usagers/benefit-form/benefit-form.component';
import { BenefitComponent } from './usagers/benefit/benefit.component';
import { CommissionComponent } from './usagers/commission/commission.component';
import { CommissionFormComponent } from './usagers/commission-form/commission-form.component';
import { CollectifComponent } from './usagers/collectif/collectif.component';
import { CollectifFormComponent } from './usagers/collectif-form/collectif-form.component';

const appRoutes: Routes = [
  { path: "accueil", component: HomeComponent},
  { path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  { path: "auth/signup", component: SignupComponent},
  { path: "auth/signin", component: SigninComponent},
  { path: "admin/actualites", canActivate: [AuthGuardService], component: AdminComponent},
  { path: "admin/actualites/view/:id", canActivate: [AuthGuardService], component: SingleActualiteComponent},
  { path: "admin/actualites/new", canActivate: [AuthGuardService], component: ActualiteFormComponent},
  { path: "actualites/feat/:id", component: ActualitesGeneralesComponent},
  { path: "actualites/view/:id", component: SingleActualiteComponent},
  { path: "categories", component: CategoriesComponent},
  { path: "categories/new", canActivate: [AuthGuardService], component: CategorieFormComponent},
  { path: "empower", component: EmpowerComponent },
  { path: "empower/membre/view/:id", component: SingleOrganisationComponent},
  { path: "actualites/view/:id", component: SingleActualiteComponent},
  { path: "empower/objectif/detail", component: ObjectifDetailComponent},
  { path: "empower/mission/detail", component: MissionDetailComponent},
  { path: "uploadfile", component: UploadComponent},
  { path: "categories/view/:categorie/feat/:id", component: SingleCategorieComponent},
  { path: "publications", component: PublicationsComponent},
  { path: "offre-emploi", component: OffreEmploiComponent},
  { path: "statistiques", component: StatistiquesComponent},
  { path: "usagers", component: UsagersComponent },
  { path: "cultures", component: CulturesComponent},
  { path: "preventions", component: PreventionsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ActualitesComponent,
    PublicationsComponent,
    OffreEmploiComponent,
    StatistiquesComponent,
    NewsletterComponent,
    PartenairesComponent,
    NavigationsComponent,
    BanieresComponent,
    ActualitesGeneralesComponent,
    SignupComponent,
    SigninComponent,
    ActualiteListComponent,
    SingleActualiteComponent,
    ActualiteFormComponent,
    AdminComponent,
    CategoriesComponent,
    CategorieFormComponent,
    EmpowerComponent,
    ObjectifsComponent,
    MissionsComponent,
    OrganisationsComponent,
    RapportsComponent,
    CommissionsComponent,
    ObjectifDetailComponent,
    OrganisationFormComponent,
    UploadComponent,
    FeaturesComponent,
    FeatureFormComponent,
    TabsComponent,
    TabComponent,
    TabsactualiteComponent,
    NavigationsactualitesComponent,
    SingleCategorieComponent,
    SidebarComponent,
    ObjectifFormComponent,
    NgbdToastGlobal,
    MissionFormComponent,
    MissionDetailComponent,
    RapportFormComponent,
    SingleOrganisationComponent,
    LayoutComponent,
    NavigationempowerComponent,
    FooterComponent,
    UsagersComponent,
    CulturesComponent,
    PreventionsComponent,
    HeadlineComponent,
    HeadlineFormComponent,
    BenefitFormComponent,
    BenefitComponent,
    CommissionComponent,
    CommissionFormComponent,
    CollectifComponent,
    CollectifFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgPipesModule,
    RouterModule.forRoot(appRoutes,{
      anchorScrolling: 'enabled',
      enableTracing: true
    })
  ],
  providers: [
    AuthService,
    ActualitesService,
    AuthGuardService,
    CategoriesService,
    UploadService,
    UploadComponent,
    ActualitesGeneralesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }