import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MainComponent } from './components/main/main.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { NoteComponent } from './components/note/note.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BudgetComponent } from './components/budget/budget.component';
import { DocsComponent } from './components/docs/docs.component';
import { DropDirective } from './directives/drop.directive';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [AppComponent, SignupComponent, LoginComponent, MainComponent, NoteComponent, BudgetComponent, DocsComponent, DropDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularToastifyModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    FormsModule,
    PdfViewerModule,
    CKEditorModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    NgxUiLoaderModule

  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
