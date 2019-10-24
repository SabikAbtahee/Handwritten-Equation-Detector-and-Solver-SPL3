import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, Subscription, observable, BehaviorSubject } from 'rxjs';
import { map, takeUntil, first } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from '@angular/router';
import { defaultConst } from '../../config/constants/defaultConstants';
import { QueryDatabaseService } from '../../core/database-service/query-database.service';
import { Entities } from '../../config/enums/default.enum';
import { CustomerUserInformation } from '../../config/interfaces/user.interface';
import { SharedService } from '../../shared/services/shared.service';
import { RootService } from '../services/root.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit, OnDestroy {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((result) => result.matches));

	title: string;
	sidebar;
	Username: string;
	// $username: Observable<any>;
	menuItems;
	selectedRow: number;
	isAuthenticated: boolean = false;
	_unsubscribeAll: Subject<any>;

	// $menuIndex = this.menuIndex.asObservable();
	constructor(
		private breakpointObserver: BreakpointObserver,
		private aut: AuthenticationService,
		private router: Router,
		private corequery: QueryDatabaseService,
		private sharedService: SharedService,
		private rootService: RootService
	) {
		this._unsubscribeAll = new Subject();
	}

	ngOnInit() {
		this.initiateVariables();
		this.setUsername();
		this.makeSideBar();
		this.checkRow();
	}

	initiateVariables() {
		this.title = defaultConst.siteName.name;
	}

	makeSideBar() {
		if (this.isAuthenticated) {
			this.sidebar = defaultConst.sidebarLoggedIn;
			this.menuItems = defaultConst.menu;
		} else {
			this.sidebar = defaultConst.sidebar;
		}
	}

	setUsername() {
		this.corequery.getLoggedInUserID().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
			if (res) {
				this.getUserName(res).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
					debugger
					this.Username = res;
					this.isAuthenticated = true;
					this.makeSideBar();
				});
			} else {
				this.Username = defaultConst.annonymous;
				this.isAuthenticated = false;
				this.makeSideBar();
			}
		});
	}

	getUserName(uid): Observable<any> {
		let personInfo: CustomerUserInformation;

		return new Observable((observer) => {
			this.corequery
				.getSingleData(Entities.Person, uid)
				.pipe(takeUntil(this._unsubscribeAll))
				.subscribe((res) => {
					personInfo = res;
					observer.next(personInfo && personInfo.name ? personInfo.name : null);
				});
		});
	}

	logout() {
		this.aut.signOut();
		this.showLogoutSnackbar();
		this.setUsername();
	}

	showLogoutSnackbar() {
		this.sharedService.openSnackBar({
			data: {
				message: 'Logged out successfully',
				isAccepted: true
			},
			duration: 3,
			horizontalPosition: 'right',
			verticalPosition: 'top',
			panelClass: [ 'default-snackbar' ]
		});
	}

	ngOnDestroy() {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
		this._unsubscribeAll.unsubscribe();
	}

	route(url) {
		this.router.navigateByUrl(url).then((res) => {
			this.checkRow();
		});
	}

	selectRow(index) {
		this.selectedRow = index;
		// console.log(this.selectedRow);
	}

	checkRow() {
		let currentUrl = this.router.url;
		let count = 0;
		for (let i of this.sidebar) {
			if (currentUrl == `/${i.url}`) {
				this.selectedRow = count;
				debugger;
				break;
			}
			count += 1;
		}
	}

	
}
