import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Maintenance
import { PerfilComponent } from './perfil/perfil.component';
import { UserComponent } from './maintenance/user/user.component';
import { HospitalComponent } from './maintenance/hospital/hospital.component';
import { DoctorComponent } from './maintenance/doctor/doctor.component';
import { DoctorComponentComponent } from './maintenance/doctor/doctor-component.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    PerfilComponent,
    UserComponent,
    HospitalComponent,
    DoctorComponent,
    DoctorComponentComponent,
    SearchComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ]
})
export class PagesModule { }
