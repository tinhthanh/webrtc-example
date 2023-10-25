import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkmapDemoComponent } from './markmap-demo/markmap-demo.component';
import { LoginComponent } from './pages/login/login.component';
import { VideoCallComponent } from './video-call/video-call.component';

const routes: Routes = [
  { path: 'login' , component:  LoginComponent },
  { path: 'video-call', component: VideoCallComponent },
  {
    path: 'mark-map' , component: MarkmapDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
