import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './components/upload/upload.component';
import { DrawComponent } from './components/draw/draw.component';
import { RouterModule, Routes } from '@angular/router';
import { mathSolverRoutes } from '../config/routes/lazyloadedRoutes.routes';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';


@NgModule({
	declarations: [ UploadComponent, DrawComponent ],
	imports: [ CommonModule, RouterModule.forChild(mathSolverRoutes), SharedModule,CoreModule ]
})
export class MathsolverModule {}
