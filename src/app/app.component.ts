import { Component } from '@angular/core';
import { words } from './words';
import { GameResultsService } from './services/game-result.service';
import { popUp } from './services/pop-up.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Hangmi';
  word = '';
  hiddenWord: string[] = [];
  letters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
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
    public gameResultsService: GameResultsService,
    private popUp: popUp
  ) {
    this.startGame();
  }

  startGame(newGame: boolean = false) {
    if (newGame) {
      this.score = 0;
    }
    this.lives = 7;
    this.usedLetters = '';
    const randomWordObj = this.getRandomWord();
    this.word = randomWordObj.word.toLowerCase();
    this.category = randomWordObj.category;
    this.hiddenWord = Array(this.word.length).fill('_');
    this.showWord = false;
  }

  newGame() {
    this.startGame(true);
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
      this.popUp.openSnackBar('Correct!', 'green-snackbar');
      setTimeout(() => {
        this.startGame();
      }, 2000);
    } else if (this.lives <= 0) {
      this.popUp.openSnackBar('Defeat!', 'red-snackbar');
      setTimeout(() => {
        this.showResultsPopup();
        this.startGame(true);
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
