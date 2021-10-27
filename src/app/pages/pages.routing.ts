import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UserComponent } from './maintenance/user/user.component';
import { HospitalComponent } from './maintenance/hospital/hospital.component';
import { DoctorComponent } from './maintenance/doctor/doctor.component';
import { DoctorComponentComponent } from './maintenance/doctor/doctor-component.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
    { path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Account Settings'} },
      { path: 'grafica1', component: Grafica1Component, data: {title: 'Graphics #1'} },
      { path: 'profile', component: PerfilComponent, data: {title: 'User profile'} },
      { path: 'progress', component: ProgressComponent, data: {title: 'ProgressBar'} },
      { path: 'promise', component: PromisesComponent, data: {title: 'Promise'} },
      { path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs'} },
      { path: 'search/:term', component: SearchComponent, data: {title: 'Search'} },

      // Maintenance
      { path: 'doctors', component: DoctorComponent, data: {title: 'App Doctors'} },
      { path: 'doctor/:id', component: DoctorComponentComponent, data: {title: 'App Doctors'} },
      { path: 'hospitals', component: HospitalComponent, data: {title: 'App Hospitals'} },

      // Admin Routes
      { path: 'users', canActivate: [AdminGuard],component: UserComponent, data: {title: 'App Users'} },
    ] 
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
