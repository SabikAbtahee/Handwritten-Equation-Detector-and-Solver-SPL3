import { DifficultyLevel } from './../../../config/constants/defaultConstants';
import { PracticeService } from './../../services/practice.service';
import { UtilityService } from '../../../core/utility-service/utility.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EquationQuestion as QuestionInterface, quiz } from '../../../config/interfaces/mathplanet.interface';
import { generate, Subject } from 'rxjs';
@Component({
	selector: 'app-practice-default',
	templateUrl: './practice-default.component.html',
	styleUrls: [ './practice-default.component.scss' ]
})
export class PracticeDefaultComponent implements OnInit {
	questionForm: FormGroup;
	perPageShow = 4;
	questionNumbers = [
		{ value: '12', viewValue: '12' },
		{ value: '24', viewValue: '24' },
		{ value: '32', viewValue: '32' }
	];
	difficulty = [
		{ value: 'easy', viewValue: 'Easy' },
		{ value: 'average', viewValue: 'Average' },
		{ value: 'hard', viewValue: 'Hard' }
	];
	questionNumber;
	minimumDifficulty;
	maximumDifficulty;
	Difficulty = DifficultyLevel;
	IsQuizRunning: boolean = false;
	// IsQuizRunningSubject: Subject<boolean>;
	GeneratedQuestions: quiz[] = [];

	first: number = 0;
	last: number = this.perPageShow;

	answer: FormControl[] = [];
	constructor(
		private fb: FormBuilder,
		private sharedService: SharedService,
		private utility: UtilityService,
		private practiceService: PracticeService
	) {}

	ngOnInit() {
		this.makeQuestionForm();
	}

	generateQuestions() {
		if (!this.questionForm.invalid) {
			this.questionNumber = this.questionForm.get('questionNumbers').value;
			this.minimumDifficulty = this.Difficulty[this.questionForm.get('difficulty').value].minimum;
			this.maximumDifficulty = this.Difficulty[this.questionForm.get('difficulty').value].maximum;
			this.generate();
		} else {
			this.utility.touchAllFieldsOfForm(this.questionForm);
		}
	}

	generate() {
		this.first = 0;
		this.last = this.perPageShow;
		let loop = this.questionNumber;
		for (let i = 0; i < loop; i++) {
			this.GeneratedQuestions.push({
				questionNumber: i + 1,
				question: this.makeRandomEquation(),
				isAnswered: false,
				givenAnswer: '',
				isCorrect: false
			});
			this.generateAnswerForm();
		}
		this.IsQuizRunning = true;
	}

	generateAnswerForm() {
		for (let i = 0; i < this.questionNumber; i++) {
			this.answer[i] = new FormControl('');
		}
	}

	makeQuestionForm() {
		this.questionForm = this.fb.group({
			questionNumbers: [ '', Validators.required ],
			difficulty: [ '', Validators.required ]
		});
	}

	makeRandomEquation() {
		let a, x, b, d, c;
		a = this.practiceService.getRandomIntWithinRange(this.minimumDifficulty, this.maximumDifficulty);
		b = this.practiceService.getRandomIntWithinRange(this.minimumDifficulty, this.maximumDifficulty);
		x = this.practiceService.getRandomIntWithinRange(this.minimumDifficulty, this.maximumDifficulty);
		d = this.practiceService.getRandomIntWithinRange(this.minimumDifficulty, this.maximumDifficulty);
		c = this.practiceService.getCGivenabxd(a, b, x, d);
		let equ = this.practiceService.makeStringGivenABCD(a, b, c, d);

		let EquObject: QuestionInterface = {
			parsed: equ,
			solution: x
		};
		return EquObject;
	}

	makeRandomExpression() {}

	makeDifferentiationExpression() {}

	makeIntegrationExpression() {}

	Forward() {
		if (this.last < this.questionNumber) {
			this.first += this.perPageShow;
			this.last += this.perPageShow;
		}
	}
	Back() {
		if (this.first > 0) {
			this.first -= this.perPageShow;
			this.last -= this.perPageShow;
		}
	}

	turnInAnswer(number) {
		if (this.answer[number - 1].value != '') {
			this.GeneratedQuestions[number - 1].isAnswered = true;
			this.GeneratedQuestions[number - 1].givenAnswer = this.answer[number - 1].value;
		} else {
			this.sharedService.openSnackBar({
				data: {
					message: 'Enter an answer or finish quiz',
					isAccepted: false
				},
				duration: 3,
				panelClass: [ 'recovery-snackbar' ]
			});
		}
	}

	finishQuiz() {
		let loop = this.questionNumber;
		let correctAnswer = 0;
		for (let i = 0; i < loop; i++) {
			if (
				Number(this.GeneratedQuestions[i].givenAnswer) ==
        Number(this.GeneratedQuestions[i].question.solution[0]) ||
				Number(this.GeneratedQuestions[i].givenAnswer) ==
        Number(this.GeneratedQuestions[i].question.solution[1])
			) {
				correctAnswer += 1;
				this.GeneratedQuestions[i].isCorrect = true;
			}
		}
		alert(correctAnswer);
	}
}
