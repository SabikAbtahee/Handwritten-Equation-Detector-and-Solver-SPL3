import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import { type } from 'os';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: [ './upload.component.scss' ]
})
export class UploadComponent implements OnInit {
	// Progress monitoring
	percentage: Observable<number>;

	snapshot: Observable<any>;

	// Download URL
	downloadURL: Observable<string>;

	// State for dropzone CSS toggling
	isHovering: boolean;
	imageChangedEvent: any = '';
	imageblob: any = '';
	croppedImage: any = '';
	isValid = false;
	constructor(private utilityService: UtilityService) {}

	ngOnInit() {}
	toggleHover(event: boolean) {
		this.isHovering = event;
	}
	startUpload(event: FileList) {}
	fileChangeEvent(event: any): void {
		if (event instanceof Event) {
			debugger;
			console.log(this.imageChangedEvent);
			if (this.utilityService.ifFileImage(event.target.files[0])) {
				this.imageChangedEvent = event;
				this.isValid = true;
			}
		}
		if (event instanceof FileList) {
			if (this.utilityService.ifFileImage(event[0])) {
				this.imageblob = event[0];
				this.isValid = true;
			}
		}
	}
	imageCropped(event: ImageCroppedEvent) {
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
