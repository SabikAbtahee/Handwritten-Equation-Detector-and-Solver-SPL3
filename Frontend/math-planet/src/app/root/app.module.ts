import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-default/root-default.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { ConfigModule } from '../config/config.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CoreModule } from '../core/core.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
// import { AnonymousComponent } from './anonymous/anonymous.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
// import { AuthguardService } from '../core/security-service/authguard.service';
import { RootService } from './services/root.service';
import { SharedService } from '../shared/services/shared.service';
// import { AdminguardGuard } from '../core/security-service/adminguard.guard';
// import { SecurityService } from '../core/security-service/security.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    // AnonymousComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ConfigModule,
    CoreModule,
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    AngularFireStorageModule ,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule

  ],
  providers: [RootService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
