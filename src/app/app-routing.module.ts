import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { BudgetComponent } from './components/budget/budget.component';
import { DocsComponent } from './components/docs/docs.component';

import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NoteComponent } from './components/note/note.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path:"signup",

    component:SignupComponent
  },
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"main",
    canActivate:[AuthGuard],
    component:MainComponent
  },
  {
    path:"budget",
    canActivate:[AuthGuard],
    component:BudgetComponent
  },
  {
    path:"docs",
    canActivate:[AuthGuard],
    component:DocsComponent
  },
  {
    path:"note/:id",
    canActivate:[AuthGuard],
    component:NoteComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
