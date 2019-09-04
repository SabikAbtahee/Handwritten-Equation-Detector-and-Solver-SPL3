import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDefaultComponent } from './components/profile-default/profile-default.component';
import { RouterModule, Routes } from '@angular/router';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileService } from './services/profile.service';
import { PasswordModalService } from './services/password-modal.service';
import { profileRoutes } from '../config/routes/lazyloadedRoutes.routes';
import { ProfilePictureUploadComponent } from './components/profile-picture-upload/profile-picture-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
	declarations: [ ProfileDefaultComponent, PasswordChangeComponent, ProfilePictureUploadComponent ],
	imports: [ CommonModule, RouterModule.forChild(profileRoutes), SharedModule,ImageCropperModule ],
	providers: [ ProfileService, PasswordModalService ],
	entryComponents: [ PasswordChangeComponent, ProfilePictureUploadComponent ]
})
export class ProfileModule {}
