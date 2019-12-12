import { Content } from './../../../config/interfaces/content.interface';
import { Component, OnInit, HostListener } from '@angular/core';
import { Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { switchMap, takeUntil, pairwise, first } from 'rxjs/operators';
import { MathsolverService } from '../../services/mathsolver.service';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import canvasToImage from 'canvas-to-image';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
	selector: 'app-draw',
	templateUrl: './draw.component.html',
	styleUrls: [ './draw.component.scss' ]
})
export class DrawComponent implements OnInit, AfterViewInit {
	canvasEl: HTMLCanvasElement;
	widthMinus = 300;
	canvasHeight=300;
	mode = 'pen';
	check;
	uploadForm: FormGroup;
	equationForm: FormGroup;
	isAuthenticated: boolean = false;
	isSavable: boolean = false;
	userId: string = '';
	imageLink: any;
	croppedImageFile: File = null;

	beforeChange;
	change;
	afterchange;
	numberOfChange;
	isSolved:boolean=false;
	constructor(
		private utilityService: UtilityService,
		private fb: FormBuilder,
		private mathSolver: MathsolverService,
		private sharedService: SharedService
	) {}

	ngOnInit() {
		this.makeEquationForm();
		this.makeUploadForm();
		this.checkUser();
	}
	makeEquationForm() {
		this.equationForm = this.fb.group({
			equation: [ '', [ Validators.required ] ],
			solution: [ '' ]
		});
	}

	makeUploadForm() {
		this.uploadForm = this.fb.group({
			picture: [ null ]
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
	@ViewChild('canvas') public canvas: ElementRef;

	@Input() public width = this.widthMinus;
	@Input() public height = this.canvasHeight;

	@HostListener('window:resize', [ '$event' ])
	onResize(event) {
		if (event.target.innerWidth - this.widthMinus > 500) {
			this.canvasEl.width = event.target.innerWidth - this.widthMinus;
		} else {
			this.canvasEl.width = event.target.innerWidth - 100;
		}
		this.canvasEl.height = this.canvasHeight;
	}

	private cx: CanvasRenderingContext2D;

	public ngAfterViewInit() {
		this.canvasEl = this.canvas.nativeElement;
		this.cx = this.canvasEl.getContext('2d');

		this.canvasEl.width = screen.width - this.widthMinus;
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
	}

	changeMode(name) {
		this.mode = name;
	}

	clearCanvas() {
		this.cx.clearRect(0, 0, this.cx.canvas.width, this.cx.canvas.height);
		this.cx.fillStyle = '#ffffff';
		this.cx.fillRect(0, 0, this.cx.canvas.width, this.cx.canvas.height); // Clears the canvas
		this.clearAll();
	}
	clearAll(){
		this.croppedImageFile = null;
		this.isSavable = false;
		this.equationForm.patchValue({
			equation: '',
			solution: ''
		});
		this.isSolved=false;
	}

	saveImage() {
		let base64 = this.canvasEl.toDataURL('image/png');
		let base64Data = base64.slice(22);

		let blobfile=this.utilityService.b64toBlob(base64Data,'image/png')
		let f = new File([ blobfile ], 'test.jpg', { type: 'image/jpeg', lastModified: Date.now() });
		this.croppedImageFile = f;
		this.mathSolver
			.predictBase64({
				base64: base64Data
			})
			.subscribe((res) => {
				this.equationForm.patchValue({
					equation: res.equation
				});
				this.solve();
				this.solveMathjs();
			});
	}
	solveMathjs(){

		let equation = this.equationForm.get('equation').value;
		let solutions=this.mathSolver.solveEquationWithMathJs(equation);
		solutions.forEach(step => {
			this.beforeChange=step.oldEquation.ascii();
			this.change=step.changeType;
			this.afterchange=step.newEquation.ascii();
			this.numberOfChange=step.substeps.length;
			this.isSolved=true;

			// console.log("before change: " + step.oldEquation.ascii());  // e.g. before change: 2x + 3x = 35
			// console.log("change: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
			// console.log("after change: " + step.newEquation.ascii());   // e.g. after change: 5x = 35
			// console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
		});
		this.isSolved=true;
	}
	solve() {
		let equation = this.equationForm.get('equation').value;
		let solution = this.mathSolver.solve(equation);
		
		debugger;
		if (!solution) {
			solution = 'Sorry No Solution found';
		}
		this.equationForm.patchValue({
			solution: solution
		});
		if(this.croppedImageFile){
			this.isSavable = true;

		}
	}
	uploadFileToFirebase(): Observable<any> {
		return new Observable((obs) => {
			let filepath = `${this.userId}/${this.croppedImageFile.name}_${new Date().getTime()}`;
			this.mathSolver.uploadFileToFirebase(filepath, this.croppedImageFile).subscribe(
				(res) => {
					this.imageLink = res;
					obs.next(res);
				},
				(err) => {
					obs.error(err);
				}
			);
		});
	}
	save() {
		this.mathSolver.getUserId().pipe(first()).subscribe((res) => {
			this.sharedService.startSpinner();
			this.userId = res;
			this.uploadFileToFirebase().subscribe(
				(res) => {
					let con: Content = {
						userId: this.userId,
						createdTime: new Date(),
						equation: this.equationForm.get('equation').value,
						solution: this.equationForm.get('solution').value,
						uid: this.sharedService.generateGUID(),
						imageLink: this.imageLink
					};
					if (con.userId && con.equation && con.solution) {
						this.mathSolver.saveContent(con);
						this.sharedService.openSnackBar({
							data: {
								message: 'Saved into account',
								isAccepted: true
							},
							duration: 3,
							panelClass: [ 'recovery-snackbar' ]
						});
						this.sharedService.hideSpinner();
					} else {
						this.sharedService.openSnackBar({
							data: {
								message: 'Please Give a equation and solution',
								isAccepted: false
							},
							duration: 3,
							panelClass: [ 'recovery-snackbar' ]
						});
						this.sharedService.hideSpinner();
					}
				},
				(err) => {
					this.sharedService.hideSpinner();

					this.sharedService.openSnackBar({
						data: {
							message: 'Internal server error',
							isAccepted: false
						},
						duration: 3,
						panelClass: [ 'recovery-snackbar' ]
					});
				}
			);
		});
	}
}
