import { DifficultyLevel } from './../../../config/constants/defaultConstants';
import { PracticeService } from './../../services/practice.service';
import { UtilityService } from '../../../core/utility-service/utility.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Component, OnInit, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EquationQuestion as QuestionInterface, quiz } from '../../../config/interfaces/mathplanet.interface';
import { generate, Subject, fromEvent } from 'rxjs';
import { MathsolverService } from '../../../mathsolver/services/mathsolver.service';
import { lookup } from 'dns';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
@Component({
	selector: 'app-practice-default',
	templateUrl: './practice-default.component.html',
	styleUrls: [ './practice-default.component.scss' ]
})
export class PracticeDefaultComponent implements OnInit {
	mode = 'pen';
	canvasEl: HTMLCanvasElement;
	widthMinus = 300;
	canvasHeight = 300;
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
	selected = 1;
	questionNumber;
	minimumDifficulty;
	maximumDifficulty;
	Difficulty = DifficultyLevel;
	IsQuizRunning: boolean = false;
	// IsQuizRunningSubject: Subject<boolean>;
	GeneratedQuestions: quiz[] = [];
	solvedAnswerCount = 0;
	correctAnswer = 0;
	first: number = 0;
	last: number = this.perPageShow;
	isQuizFinished = false;
	croppedImageFile;
	answer: FormControl[] = [];
	constructor(
		private fb: FormBuilder,
		private sharedService: SharedService,
		private utility: UtilityService,
		private practiceService: PracticeService,
		private mathsolver: MathsolverService,
		private utilityService: UtilityService
	) {}

	ngOnInit() {
		this.makeQuestionForm();
		this.start();
	}
	start() {
		this.questionForm.get('difficulty').patchValue('easy');
		this.questionForm.get('questionNumbers').patchValue('12');

		this.questionNumber = 12;
		this.minimumDifficulty = this.Difficulty['easy'].minimum;
		this.maximumDifficulty = this.Difficulty['easy'].maximum;
		this.generate();
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
		this.GeneratedQuestions = [];
		this.isQuizFinished = false;
		this.IsQuizRunning = true;
		let changeQuestion = loop / 2;
		for (let i = 0; i < loop; i++) {
			this.GeneratedQuestions.push({
				questionNumber: i + 1,
				question: i >= changeQuestion ? this.makeRandomExpression() : this.makeRandomEquation(),
				isAnswered: false,
				givenAnswer: '',
				isCorrect: false,
				type: i >= changeQuestion ? 'expression' : 'equation'
			});
		}
		this.solvedAnswerCount = 0;
		this.generateAnswerForm();
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

		let answers = this.practiceService.solveEquationConfirmed(equ);
		// answers.push(x);
		let par = `Solve for x for the following equation ${equ}`;
		let EquObject: QuestionInterface = {
			parsed: par,
			solution: answers
		};
		return EquObject;
	}

	makeRandomExpression() {
		let a, b, c, d;
		a = this.practiceService.getRandomIntWithinRange(this.minimumDifficulty, this.maximumDifficulty);
		b = this.practiceService.getRandomIntWithinRange(this.minimumDifficulty, this.maximumDifficulty);
		c = this.practiceService.getRandomIntWithinRange(this.minimumDifficulty, this.maximumDifficulty);

		let equ = this.practiceService.makeExpression(a, b, c);
		d = this.practiceService.solveExpression(equ);

		let par = `Solve the following expression ${equ}`;
		let EquObject: QuestionInterface = {
			parsed: par,
			solution: d
		};
		return EquObject;
	}

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

			let ans = this.GeneratedQuestions[number - 1].question.solution;
			let givenAns1 = Number(this.answer[number - 1].value);
			let givenAns2 = String(this.answer[number - 1].value);

			if (ans.includes(givenAns2) || ans.includes(givenAns1)) {
				this.GeneratedQuestions[number - 1].isCorrect = true;
			} else {
				this.GeneratedQuestions[number - 1].isCorrect = false;
			}
			this.countGivenAnswer();
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

	countGivenAnswer() {
		let loop = this.questionNumber;
		let count = 0;
		for (let i = 0; i < loop; i++) {
			if (this.GeneratedQuestions[i].isAnswered == true) {
				count += 1;
			}
		}
		this.solvedAnswerCount = count;
	}

	finishQuiz() {
		this.sharedService
			.openConfirmationDialog({
				icon: 'error_outline',
				message: 'Are you sure to finish quiz?',
				noButton: 'Cancel',
				yesButton: 'Confirm'
			})
			.subscribe((res) => {
				if (res) {
					let loop = this.questionNumber;
					this.correctAnswer = 0;
					for (let i = 0; i < loop; i++) {
						if (this.GeneratedQuestions[i].isCorrect) {
							this.correctAnswer += 1;
						}
					}
					this.countGivenAnswer();
					this.IsQuizRunning = false;
					this.isQuizFinished = true;
				}
			});
	}

	selectQuestion(num) {
		this.selected = num;
	}

	@ViewChild('canvas') public canvas: ElementRef;

	@Input() public width = this.widthMinus;
	@Input() public height = this.canvasHeight;

	@HostListener('window:resize', [ '$event' ])
	onResize(event) {
		if (event.target.innerWidth - this.widthMinus > 500) {
			this.canvasEl.width = this.widthMinus;
		} else {
			this.canvasEl.width = this.canvasHeight;
		}
		this.canvasEl.height = this.canvasHeight;
	}

	private cx: CanvasRenderingContext2D;

	public ngAfterViewInit() {
		this.canvasEl = this.canvas.nativeElement;
		this.cx = this.canvasEl.getContext('2d');

		this.canvasEl.width = this.widthMinus;
		this.canvasEl.height = this.canvasHeight;
		this.cx.fillStyle = '#ffffff';
		this.cx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
		this.cx.lineWidth = 5;
		this.cx.lineCap = 'round';
		this.cx.strokeStyle = '#000';

		this.captureEvents(this.canvasEl);
	}

	private captureEvents(canvasEl: HTMLCanvasElement) {
		fromEvent(canvasEl, 'mousedown')
			.pipe(
				switchMap((e) => {
					return fromEvent(canvasEl, 'mousemove').pipe(
						takeUntil(fromEvent(canvasEl, 'mouseup')),
						takeUntil(fromEvent(canvasEl, 'mouseleave')),
						pairwise()
					);
				})
			)
			.subscribe((res: [MouseEvent, MouseEvent]) => {
				const rect = canvasEl.getBoundingClientRect();

				const prevPos = {
					x: res[0].clientX - rect.left,
					y: res[0].clientY - rect.top
				};

				const currentPos = {
					x: res[1].clientX - rect.left,
					y: res[1].clientY - rect.top
				};

				this.drawOnCanvas(prevPos, currentPos);
				// this.saveImage();
			});
	}

	private drawOnCanvas(prevPos: { x: number; y: number }, currentPos: { x: number; y: number }) {
		if (!this.cx) {
			return;
		}

		this.cx.beginPath();
		if (prevPos && this.mode == 'pen') {
			this.cx.globalCompositeOperation = 'source-over';
			this.cx.lineWidth = 5;
			this.cx.strokeStyle = '#000';
			this.cx.moveTo(prevPos.x, prevPos.y); // from
			this.cx.lineTo(currentPos.x, currentPos.y);
			this.cx.stroke();
		} else if (prevPos && this.mode == 'eraser') {
			this.cx.globalCompositeOperation = 'source-over';
			this.cx.lineWidth = 20;
			this.cx.strokeStyle = '#ffffff';
			this.cx.moveTo(prevPos.x, prevPos.y); // from
			this.cx.lineTo(currentPos.x, currentPos.y);
			this.cx.stroke();
		}
		this.saveImage();
	}

	changeMode(name) {
		this.mode = name;
	}

	clearCanvas() {
		this.cx.clearRect(0, 0, this.cx.canvas.width, this.cx.canvas.height);
		this.cx.fillStyle = '#ffffff';
		this.cx.fillRect(0, 0, this.cx.canvas.width, this.cx.canvas.height); // Clears the canvas
		// this.clearAll();
	}
	saveImage() {
		let base64 = this.canvasEl.toDataURL('image/png');
		let base64Data = base64.slice(22);

		let blobfile = this.utilityService.b64toBlob(base64Data, 'image/png');
		let f = new File([ blobfile ], 'test.jpg', { type: 'image/jpeg', lastModified: Date.now() });
		this.croppedImageFile = f;
		this.mathsolver
			.predictBase64({
				base64: base64Data
			})
			.subscribe((res) => {
				if (this.IsQuizRunning) {
					this.answer[this.selected - 1].patchValue(res.equation);
				}
				// this.equationForm.patchValue({
				// 	equation: res.equation
				// });
				// this.solve();
				// this.solveMathjs();
			});
	}
}
