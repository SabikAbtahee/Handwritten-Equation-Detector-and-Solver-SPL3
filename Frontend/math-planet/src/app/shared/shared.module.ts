import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatDividerModule,
	MatProgressBarModule,
	MatSnackBarModule,
	MatTableModule,
	MatCheckboxModule,
	MatPaginatorModule,
	MatListModule,
	MatSidenavModule,
	MatChipsModule,
	MatSortModule
} from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SharedService } from './services/shared.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DropzoneDirective } from './directives/dropzone.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmComponent } from './components/confirm/confirm.component';
@NgModule({
	declarations: [ SnackbarComponent, DropzoneDirective, ConfirmComponent ],
	imports: [
		AngularFontAwesomeModule,

		ImageCropperModule,
		CommonModule,
		FlexLayoutModule,
		MatSelectModule,
		MatMenuModule,
		ReactiveFormsModule,
		FormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,

		MatDividerModule,
		MatProgressBarModule,
		MatSnackBarModule,
		MatDialogModule,
		MatButtonToggleModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		HttpClientModule,
		MatTableModule,
		MatCheckboxModule,
		MatPaginatorModule,
		NgxSpinnerModule,

		MatChipsModule,
		MatSortModule
	],
	exports: [
		AngularFontAwesomeModule,

		ImageCropperModule,
		CommonModule,
		FlexLayoutModule,
		MatSelectModule,
		MatMenuModule,
		ReactiveFormsModule,
		FormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,

		MatDividerModule,
		MatProgressBarModule,
		MatSnackBarModule,
		MatDialogModule,
		MatButtonToggleModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		HttpClientModule,
		MatTableModule,
		MatCheckboxModule,
		MatPaginatorModule,
		NgxSpinnerModule,

		MatChipsModule,
		MatSortModule
	],
	providers: [ SharedService ],
	entryComponents: [ SnackbarComponent,ConfirmComponent ]
})
export class SharedModule {}
