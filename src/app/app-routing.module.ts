import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import {SignupComponent} from './signup/signup.component';
const routes: Routes = [
  {path:'signUp',component : SignupComponent},
  {path:'login',component : LoginComponent},
  {path: 'dashboard',component: DashBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
