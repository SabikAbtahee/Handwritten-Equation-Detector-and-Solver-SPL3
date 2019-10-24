import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryDefaultComponent } from './components/history-default/history-default.component';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes)
  ]
})
export class HistoryModule { }
