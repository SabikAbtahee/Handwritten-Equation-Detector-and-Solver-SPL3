import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialDefaultComponent } from './components/tutorial-default/tutorial-default.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes:Routes=[
  {
    path:'',
    component:TutorialDefaultComponent,
    
  },
]
@NgModule({
  declarations: [TutorialDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule
  ]
})
export class TutorialModule { }
