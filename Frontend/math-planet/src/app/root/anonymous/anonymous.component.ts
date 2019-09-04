import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
	selector: 'app-anonymous',
	templateUrl: './anonymous.component.html',
	styleUrls: [ './anonymous.component.scss' ]
})
export class AnonymousComponent implements OnInit {
	constructor(private aut: AuthenticationService) {}

	ngOnInit() {
		// console.log(this.aut.getCurrentUser());
	}
}
