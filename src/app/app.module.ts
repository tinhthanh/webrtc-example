import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { environment } from '../assets/environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore  } from '@angular/fire/firestore';
import { provideDatabase , getDatabase } from '@angular/fire/database';
import { provideAuth , getAuth} from '@angular/fire/auth';
import { LoginComponent } from './pages/login/login.component';
import { MarkmapDemoComponent } from './markmap-demo/markmap-demo.component';
@NgModule({
  declarations: [
    AppComponent,
    VideoCallComponent,
    LoginComponent,
    MarkmapDemoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth())

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
