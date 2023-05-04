import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { NicknameModalComponent } from './components/nickname-modal/nickname-modal.component';
import { HangmanDrawingComponent } from './components/hangman-drawing/hangman-drawing.component';

import { popUp } from './services/pop-up.service';
import { GameResultsService } from './services/game-result.service';

@NgModule({
  declarations: [
    AppComponent,
    HangmanDrawingComponent,
    GameInfoComponent,
    NicknameModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [GameResultsService, popUp],
  bootstrap: [AppComponent],
})
export class AppModule {}
