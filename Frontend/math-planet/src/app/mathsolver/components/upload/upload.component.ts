import { Equation } from './../../../config/interfaces/mathplanet.interface';
import { MathsolverService } from './../../services/mathsolver.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UtilityService } from '../../../core/utility-service/utility.service';
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

	algebra = require('algebra.js');

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
						solution: ans.toString()
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

	

	imageCropped(event: ImageCroppedEvent) {
		// debugger;
		console.log(event);
		this.croppedImage = event.base64;
		// let x={
		// 	base64:event.base64
		// }
		// this.mathSolver.predictBase64(x).pipe(first()).subscribe(res=>{
		// 	console.log(res);
		// })
		// console.log(this.imageblob);
		// let blob=event.file;
		// let file=this.blobToFile(blob,'test.png');
		// debugger;
		// var file = new File([blob], "test",{type:"image/png"});
		// this.upload(event.file).subscribe(res=>{
		// 	console.log(res.equation);
		// })

	
		
	}
	
	imageLoaded() {
		console.log("Cropper Loaded");
		
	}
	cropperReady() {
		console.log("Cropper ready to use");
	}
	loadImageFailed() {
		console.log("Image Loading failed");
	}

	//upload file to server
	upload(image): Observable<Equation> {
		let f = new FormData();
		f.append('file', image, 'test.png');

		return new Observable(observer=>{
			this.mathSolver.predictImage(f).pipe(first()).subscribe(res=>{
				observer.next(res);
			},
			err=>{
				observer.error(err);
			})
		})
	}

	fileSelected(event) {
		this.imageChangedEvent=event;
		if (event && event.target && event.target.files.length > 0) {
			if (this.utilityService.ifFileImage(event.target.files[0])) {
				this.imageblob = event.target.files[0];
				this.isValid=true;
			}
		} else if (event instanceof FileList) {
			if (this.utilityService.ifFileImage(event[0])) {
				this.imageblob = event[0];
				this.isValid=false;

			}
		}

		console.log(this.imageblob);
		// this.upload(this.imageblob).subscribe(res=>{
		// 	console.log(res.equation);
		// })
	}

	solve(){
		let x=this.equationForm.get('equation').value;
		console.log(x);
	}

	reupload(){
		this.isValid=!this.isValid;
	}


	// fileChangeEvent(event: any): void {
	// 	// if (event instanceof Event) {
	// 	// 	debugger;
	// 	// 	console.log(this.imageChangedEvent);
	// 	// 	if (this.utilityService.ifFileImage(event.target.files[0])) {
	// 	// 		this.imageChangedEvent = event;
	// 	// 		this.isValid = true;
	// 	// 	}
	// 	// }
	// 	// if (event instanceof FileList) {
	// 	// 	if (this.utilityService.ifFileImage(event[0])) {
	// 	// 		this.imageblob = event[0];
	// 	// 		this.isValid = true;
	// 	// 	}
	// 	// }
	// 	this.imageChangedEvent = event;
	// 	this.isValid = true;
	// }
}
