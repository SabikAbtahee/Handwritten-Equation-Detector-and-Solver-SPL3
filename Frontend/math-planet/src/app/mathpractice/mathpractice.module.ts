import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeDefaultComponent } from './components/practice-default/practice-default.component';
import { mathPracticeRoutes } from '../config/routes/lazyloadedRoutes.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PracticeDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(mathPracticeRoutes)
  ]
})
export class MathpracticeModule { }
