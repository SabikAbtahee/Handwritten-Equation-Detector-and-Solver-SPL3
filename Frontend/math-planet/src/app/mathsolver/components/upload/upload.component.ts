import { MathsolverService } from './../../services/mathsolver.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { type } from 'os';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: [ './upload.component.scss' ]
})
export class UploadComponent implements OnInit {
	// Progress monitoring

	// Download URL

	// State for dropzone CSS toggling
	isHovering: boolean;
	imageChangedEvent: any = '';
	imageblob: any = '';
	croppedImage: any = '';
	isValid = false;

	uploadForm: FormGroup;
	equationForm: FormGroup;
	formData = new FormData();
	algebra = require('algebra.js')

	constructor(
		private utilityService: UtilityService,
		private fb: FormBuilder,
		private mathSolver: MathsolverService
	) {}

	ngOnInit() {
		this.makeUploadForm();
		this.makeEquationForm();
		
	}

	makeEquationForm() {
		this.equationForm = this.fb.group({
			equation: [ '' ],
			solution: [ '' ]
		});
	}

	makeUploadForm() {
		this.uploadForm = this.fb.group({
			picture: [ null ]
		});
	}
	onSubmit() {
		this.mathSolver.predictImage(this.formData).pipe(first()).subscribe(
			(res) => {
				console.log(res);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	onFileSelect(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			console.log(file);
			let f = new FormData();
			// formData.append('name', 'file');
			f.append('file', file, 'test.png');
			this.mathSolver.predictImage(f).pipe(first()).subscribe(
				(res) => {
					
					// let steps = this.mathsteps.simplifyExpression('x^2+3+3');
					var eq = this.algebra.parse(res.equation);

					// console.log(eq.toString());

					var ans = eq.solveFor('x');
					this.equationForm.patchValue({
						equation: res.equation,
						solution:ans.toString()

					});
					// console.log('x = ' + ans.toString());
					// console.log(res.equation);
				},
				(err) => {
					console.log(err);
				}
			);
			// formData.append('file', this.uploadForm.get('picture').value);
			// this.uploadForm.get('picture').setValue(file);
		}
	}

	toggleHover(event: boolean) {
		this.isHovering = event;
	}
	startUpload(event: FileList) {}

	fileChangeEvent(event: any): void {
		// if (event instanceof Event) {
		// 	debugger;
		// 	console.log(this.imageChangedEvent);
		// 	if (this.utilityService.ifFileImage(event.target.files[0])) {
		// 		this.imageChangedEvent = event;
		// 		this.isValid = true;
		// 	}
		// }
		// if (event instanceof FileList) {
		// 	if (this.utilityService.ifFileImage(event[0])) {
		// 		this.imageblob = event[0];
		// 		this.isValid = true;
		// 	}
		// }
		this.imageChangedEvent = event;
		this.isValid = true;
	}

	imageCropped(event: ImageCroppedEvent) {
		console.log(event.file);
		this.croppedImage = event.base64;
	}
	imageLoaded() {
		// show cropper
	}
	cropperReady() {
		// cropper ready
	}
	loadImageFailed() {
		// show message
	}
}
