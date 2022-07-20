import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { ChartModule } from 'angular2-chartjs';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [Dashboard1Component],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
