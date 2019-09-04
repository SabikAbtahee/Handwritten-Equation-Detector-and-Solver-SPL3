import { Component, OnInit } from '@angular/core';

import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
	selector: 'app-profile-picture-upload',
	templateUrl: './profile-picture-upload.component.html',
	styleUrls: [ './profile-picture-upload.component.scss' ]
})
export class ProfilePictureUploadComponent implements OnInit {
	task: AngularFireUploadTask;
	percentage: Observable<number>;
	snapshot: Observable<any>;

	isHovering: boolean;
	imageChangedEvent: any = '';
	croppedImage: any = '';
	constructor(private storage: AngularFireStorage, public dialogRef: MatDialogRef<ProfilePictureUploadComponent>) {}

	toggleHover(event: boolean) {
		this.isHovering = event;
	}

	startUpload(event: FileList) {
		// const file = event.item(0)
		// // Client-side validation example
		// if (file.type.split('/')[0] !== 'image') {
		//   console.error('unsupported file type :( ')
		//   return;
		// }
		// const path = `test/${new Date().getTime()}_${file.name}`;
		// this.task = this.storage.upload(path, file);
		// this.percentage = this.task.percentageChanges();
		// this.snapshot   = this.task.snapshotChanges();
	}

	isActive(snapshot) {
		return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
	}

	fileChangeEvent(event: any): void {
		this.imageChangedEvent = event;
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

	ngOnInit() {}
	onNoClick(): void {
		this.dialogRef.close();
	}
}
