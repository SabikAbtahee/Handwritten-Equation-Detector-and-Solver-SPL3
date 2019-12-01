import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './components/upload/upload.component';
import { DrawComponent } from './components/draw/draw.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SolveComponent } from './components/solve/solve.component';

const routes:Routes=[
	{
		path:'',
		redirectTo:'upload',
	  },
	{
		path:'upload',
		component:UploadComponent,
	  },
	  {
		path:'draw',
		component:DrawComponent,
	  },
]

@NgModule({
	declarations: [ UploadComponent, DrawComponent, SolveComponent ],
	imports: [ CommonModule,
		 RouterModule.forChild(routes),
		  SharedModule,
		   CoreModule ]
})
export class MathsolverModule {}
