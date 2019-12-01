import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../core/utility-service/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MathsolverService } from '../../services/mathsolver.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-solve',
  templateUrl: './solve.component.html',
  styleUrls: ['./solve.component.scss']
})
export class SolveComponent implements OnInit {
  uploadForm: FormGroup;
  equationForm: FormGroup;
	isAuthenticated: boolean = false;
	isSavable: boolean = false;
  
  constructor(
    private utilityService: UtilityService,
		private fb: FormBuilder,
		private mathSolver: MathsolverService,
		private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.makeEquationForm();
		this.checkUser();
  }
  makeEquationForm() {
		this.equationForm = this.fb.group({
			equation: [ '', [ Validators.required ] ],
			solution: [ '' ]
		});
  }
  checkUser() {
		this.mathSolver.isUserLoggedIn().subscribe((res) => {
			if (res) {
				this.isAuthenticated = true;
			} else {
				this.isAuthenticated = false;
			}
		});
  }
  solve() {
		let equation = this.equationForm.get('equation').value;
		let solution = this.mathSolver.solveEquation(equation);
		if (!solution) {
			solution = 'Sorry No Solution found';
		}
		this.equationForm.patchValue({
			solution: solution
		});
		this.isSavable=true;
	}

}
