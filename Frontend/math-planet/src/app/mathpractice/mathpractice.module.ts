import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeDefaultComponent } from './components/practice-default/practice-default.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes=[
  {
    path:'',
    component:PracticeDefaultComponent
  }
]
@NgModule({
  declarations: [PracticeDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MathpracticeModule { }
