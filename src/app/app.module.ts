import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HangmanDrawingComponent } from './components/hangman-drawing/hangman-drawing.component';
import { popUp } from './services/pop-up.service';

@NgModule({
  declarations: [AppComponent, HangmanDrawingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [popUp],
  bootstrap: [AppComponent],
})
export class AppModule {}
