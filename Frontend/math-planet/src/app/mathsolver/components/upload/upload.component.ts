import { Content } from './../../../config/interfaces/content.interface';
import { SharedService } from './../../../shared/services/shared.service';
import { element } from 'protractor';
import { Equation } from './../../../config/interfaces/mathplanet.interface';
import { MathsolverService } from './../../services/mathsolver.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UtilityService } from '../../../core/utility-service/utility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
	croppedImageFile: File = null;
	isValid = false;
	initialBase64pic: any = '';
	uploadForm: FormGroup;
	equationForm: FormGroup;
	formData = new FormData();
	isAuthenticated: boolean = false;
	userId: string = '';
	isSavable: boolean = false;
	imageLink:any;
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

	fileSelected(event) {
		if (event && event.target && event.target.files.length > 0) {
			if (this.utilityService.ifFileImage(event.target.files[0])) {
				this.imageblob = event.target.files[0];
				this.convertFiletoBase64(this.imageblob);
				this.isValid = true;
			}
		} else if (event instanceof FileList) {
			if (this.utilityService.ifFileImage(event[0])) {
				this.imageblob = event[0];
				this.convertFiletoBase64(this.imageblob);
				this.isValid = true;
			}
		}
	}

	imageCropped(event: ImageCroppedEvent) {
		this.croppedImage = event.base64;
		let blobfile = event.file;
		let f = new File([ blobfile ], 'test.jpg', { type: 'image/jpeg', lastModified: Date.now() });
		this.croppedImageFile = f;
	}

	upload() {
		let f = new FormData();
		if (this.croppedImageFile != null) {
			f.append('file', this.croppedImageFile, 'test.jpg');

			this.mathSolver.predictImage(f).pipe(first()).subscribe((res) => {
				this.equationForm.patchValue({
					equation: res.equation
				});
				this.solve();
			});
		} else {
			this.sharedService.openSnackBar({
				data: {
					message: 'Please Select a file',
					isAccepted: false
				},
				duration: 3,
				panelClass: [ 'recovery-snackbar' ]
			});
		}
	}

	reupload() {
		this.isValid = !this.isValid;
		this.imageblob = '';
		this.croppedImage = '';
		this.croppedImageFile = null;
		this.isSavable = false;
		this.equationForm.patchValue({
			equation: '',
			solution: ''
		});
	}

	solve() {
		let equation = this.equationForm.get('equation').value;
		let solution = this.mathSolver.solve(equation);
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

	toggleHover(event: boolean) {
		this.isHovering = event;
	}

	imageLoaded() {
		// console.log('Cropper Loaded');
	}

	cropperReady() {
		// console.log('Cropper ready to use');
	}

	loadImageFailed() {
		// console.log('Image Loading failed');
	}

	convertFiletoBase64(fileInput) {
		var myReader: FileReader = new FileReader();
		myReader.onloadend = (e) => {
			this.initialBase64pic = myReader.result;
		};
		myReader.readAsDataURL(fileInput);
	}

	uploadFileToFirebase():Observable<any>{
		return new Observable(obs=>{
			let filepath=`${this.userId}/${this.croppedImageFile.name}_${new Date().getTime()}`;
			this.mathSolver.uploadFileToFirebase(filepath,this.croppedImageFile).subscribe(res=>{
				this.imageLink=res;
				obs.next(res);
			},
			err=>{
				obs.error(err);
			})
		})
		
	}

	save() {
		this.mathSolver.getUserId().pipe(first()).subscribe((res) => {
			this.sharedService.startSpinner();
			this.userId = res;
			this.uploadFileToFirebase().subscribe(res=>{
				let con: Content = {
					userId: this.userId,
					createdTime: new Date(),
					equation: this.equationForm.get('equation').value,
					solution: this.equationForm.get('solution').value,
					uid: this.sharedService.generateGUID(),
					imageLink:this.imageLink
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
			err=>{
				this.sharedService.hideSpinner();

				this.sharedService.openSnackBar({
					data: {
						message: 'Internal server error',
						isAccepted: false
					},
					duration: 3,
					panelClass: [ 'recovery-snackbar' ]
				});
			});
			
		});

		
	}
}
