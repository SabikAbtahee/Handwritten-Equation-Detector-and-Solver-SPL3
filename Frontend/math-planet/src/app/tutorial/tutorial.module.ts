import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialDefaultComponent } from './components/tutorial-default/tutorial-default.component';
import { RouterModule } from '@angular/router';
import { mathTutorial } from '../config/routes/lazyloadedRoutes.routes';

@NgModule({
  declarations: [TutorialDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(mathTutorial)
  ]
})
export class TutorialModule { }
