import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialDefaultComponent } from './components/tutorial-default/tutorial-default.component';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes)
  ]
})
export class TutorialModule { }
