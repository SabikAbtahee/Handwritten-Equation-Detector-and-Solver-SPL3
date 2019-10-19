import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SharedService } from './services/shared.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DropzoneDirective } from './directives/dropzone.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SnackbarComponent,DropzoneDirective],
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    InternationalPhoneNumberModule,
    NgxIntlTelInputModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    ImageCropperModule,
    HttpClientModule
  ],
  exports:[
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    InternationalPhoneNumberModule,
    NgxIntlTelInputModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    ImageCropperModule,
    DropzoneDirective,
    HttpClientModule
  ],
  providers:[SharedService],
  entryComponents:[SnackbarComponent],
  
})
export class SharedModule { }
