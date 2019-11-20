import { ConfigModule } from './../config/config.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryDefaultComponent } from './components/history-default/history-default.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes:Routes=[
  {
    path:'',
    component:HistoryDefaultComponent
  }
]
@NgModule({
  declarations: [HistoryDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    ConfigModule
  ]
})
export class HistoryModule { }
