import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { words } from './words';
import { GameResultsService } from './services/game-result.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Hangmi';
  word = '';
  hiddenWord: string[] = [];
  letters = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż'.split('');
  usedLetters = '';
  lives = 7;
  score = 0;
  showWord = false;
  category = '';
  showResults: boolean = false;
  showWinPopup: boolean = false;

  results: any[] = [
    { playerName: 'Jan', score: 5 },
    { playerName: 'Anna', score: 8 },
    { playerName: 'Jordan', score: 10 },
    { playerName: 'Kerry', score: 12 },
    { playerName: 'Sam', score: 16 },
    { playerName: 'David', score: 32 },
  ];

  constructor(
    private snackBar: MatSnackBar,
    public gameResultsService: GameResultsService
  ) {
    this.startGame();
  }

  startGame() {
    this.lives = 7;
    this.usedLetters = '';
    const randomWordObj = this.getRandomWord();
    this.word = randomWordObj.word.toLowerCase();
    this.category = randomWordObj.category;
    this.hiddenWord = Array(this.word.length).fill('_');
    this.showWord = false;
    this.score = 0;
  }

  getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  guessLetter(letter: string) {
    if (this.usedLetters.includes(letter) || this.lives <= 0 || this.showWord) {
      return;
    }

    this.usedLetters += letter;

    if (this.word.includes(letter)) {
      const newHiddenWord = [];
      let guessedThisRound = 0;

      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          newHiddenWord.push(letter);
          if (this.hiddenWord[i] === '_') {
            guessedThisRound++;
          }
        } else {
          newHiddenWord.push(this.hiddenWord[i]);
        }
      }

      this.hiddenWord = newHiddenWord;
      this.score += guessedThisRound * 10;
    } else {
      this.lives--;
    }

    if (this.hiddenWord.join('') === this.word) {
      this.score += this.lives * 20;
      this.snackBar.open('Correct!', '', {
        duration: 2000,
        panelClass: ['green-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.startGame();
      }, 2000);
    } else if (this.lives <= 0) {
      this.snackBar.open('Defeat!', '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.showResultsPopup();
      }, 2000);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const letter = event.key.toLowerCase();
    if (this.letters.includes(letter)) {
      this.guessLetter(letter);
    }
  }

  showResultsPopup() {
    const playerName = 'Github Player';
    this.gameResultsService.addResult(playerName, this.score);
    this.gameResultsService.sortResults();

    this.showResults = true;
  }

  closeResultsPopup() {
    this.showResults = false;
  }

  addResult(playerName: string, score: number): void {
    this.gameResultsService.addResult(playerName, score);
    this.gameResultsService.sortResults();
  }
}
