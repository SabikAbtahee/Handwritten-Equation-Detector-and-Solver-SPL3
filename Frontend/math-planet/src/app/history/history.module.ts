import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryDefaultComponent } from './components/history-default/history-default.component';
import { RouterModule } from '@angular/router';
import { historyRoutes } from '../config/routes/lazyloadedRoutes.routes';

@NgModule({
  declarations: [HistoryDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(historyRoutes)
  ]
})
export class HistoryModule { }
