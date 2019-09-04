import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './components/upload/upload.component';
import { DrawComponent } from './components/draw/draw.component';
import { RouterModule, Routes } from '@angular/router';
import { mathSolverRoutes } from '../config/routes/lazyloadedRoutes.routes';


@NgModule({
	declarations: [ UploadComponent, DrawComponent ],
	imports: [ CommonModule, RouterModule.forChild(mathSolverRoutes) ]
})
export class MathsolverModule {}
