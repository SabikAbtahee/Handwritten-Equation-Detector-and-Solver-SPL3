import { Routes } from '@angular/router';
import { AnonymousComponent } from './anonymous/anonymous.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireAuthGuard, loggedIn, canActivate } from '@angular/fire/auth-guard';
import { AuthguardService } from '../core/security-service/authguard.service';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'mathsolver',
		pathMatch: 'full'
	},
	{
		path: '',
		component: NavbarComponent,
		children: [
			
			{
				path: 'mathsolver',
				loadChildren: '../mathsolver/mathsolver.module#MathsolverModule',
			},
			{
				path: 'mathpractice',
				loadChildren: '../mathpractice/mathpractice.module#MathpracticeModule',
			},
			{
				path: 'history',
				loadChildren: '../history/history.module#HistoryModule',
				canActivate:[AuthguardService]
			},
			{
				path: 'tutorial',
				loadChildren: '../tutorial/tutorial.module#TutorialModule',

			},
			
		]
	},
	{
		path: '',
		component: AnonymousComponent,
		children: [
			{
				path: 'authentication',
				loadChildren: '../authentication/authentication.module#AuthenticationModule',
				
			}
		]
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];
