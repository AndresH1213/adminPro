import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';

import { IncreasingComponent } from './increasing/increasing.component';
import { DonughtComponent } from './donught/donught.component';



@NgModule({
  declarations: [
    IncreasingComponent,
    DonughtComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncreasingComponent,
    DonughtComponent
  ]
})
export class ComponentsModule { }
