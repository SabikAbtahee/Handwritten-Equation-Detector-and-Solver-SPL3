import { Routes } from '@angular/router';
import { SignInComponent } from 'src/app/authentication/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/authentication/components/sign-up/sign-up.component';
import { AccountRecoveryComponent } from 'src/app/authentication/components/account-recovery/account-recovery.component';
import { UploadComponent } from 'src/app/mathsolver/components/upload/upload.component';
import { DrawComponent } from 'src/app/mathsolver/components/draw/draw.component';
import { ProfileDefaultComponent } from 'src/app/profile/components/profile-default/profile-default.component';
import { PracticeDefaultComponent } from 'src/app/mathpractice/components/practice-default/practice-default.component';
import { TutorialDefaultComponent } from 'src/app/tutorial/components/tutorial-default/tutorial-default.component';
import { HistoryDefaultComponent } from 'src/app/history/components/history-default/history-default.component';
import { PasswordChangeComponent } from 'src/app/profile/components/password-change/password-change.component';

export const authenticationRoutes: Routes = [
	{
		path: '',
		redirectTo: 'sign-in'
	},
	{
		path: 'sign-in',
		component: SignInComponent
	},
	{
		path: 'sign-up',
		component: SignUpComponent
	},
	{
		path: 'account-recovery',
		component: AccountRecoveryComponent
	}
];


export const mathSolverRoutes:Routes=[
	{
		path:'',
		redirectTo:'upload',
		pathMatch:'full'
	},
	{
		path:'upload',
		component:UploadComponent
	},
	{
		path:'draw',
		component:DrawComponent
	}
];

export const mathPracticeRoutes:Routes=[
	{
		path:'',
		component:PracticeDefaultComponent
	}
];
export const mathTutorial:Routes=[
	{
		path:'',
		component:TutorialDefaultComponent
	}
];
export const historyRoutes:Routes=[
	{
		path:'',
		component:HistoryDefaultComponent
	}
];
// export const categoryRoutes: Routes = [
// 	{
// 		path: '',
// 		component: CategoryDefaultComponent
// 	}
// ];

// export const adminRoutes: Routes = [
// 	{
// 		path: '',
// 		component: AdminDefaultComponent
// 	}
// ];

// export const enquiryRoutes: Routes = [
// 	{
// 		path: '',
// 		component: EnquiryDefaultComponent
// 	}
// ];
// export const productRoutes: Routes = [
// 	{
// 		path: '',
// 		component: ProductDefaultComponent
// 	}
// ];

export const profileRoutes: Routes = [
	{
		path: '',
		component: PasswordChangeComponent
	}
];

// export const purchaseRoutes:Routes=[
//   {
//     path:'',
//     component:PurchaseDefaultComponent
//   }
// ];

// export const shoppingcartRoutes:Routes=[
//   {
//     path:'',
//     component:ShoppingCartDefaultComponent
//   },
//   {
//     path:'order',
//     component:OrderSuccessComponent,

//   }
// ]
