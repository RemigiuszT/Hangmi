import { Component } from '@angular/core';
import { words } from './words';
import { GameResultsService } from './services/game-result.service';
import { popUp } from './services/pop-up.service';
import { MatDialog } from '@angular/material/dialog';
import { NicknameModalComponent } from './components/nickname-modal/nickname-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Hangmi';
  playerName: string = '';
  hiddenWord: string[] = [];
  word = '';
  category = '';
  letters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
  usedLetters = '';
  lives = 7;
  score = 0;
  showWord = false;
  showResults: boolean = false;
  showWinPopup: boolean = false;
  results: any[] = [];

  row1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  row2: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  row3: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  private resultsSubscription: Subscription | null = null;

  constructor(
    public gameResultsService: GameResultsService,
    private popUp: popUp,
    private dialog: MatDialog
  ) {
    this.startGame();
    this.loadResults();
  }

  ngOnInit() {
    this.showNicknameModal();
  }

  ngOnDestroy() {
    if (this.resultsSubscription) {
      this.resultsSubscription.unsubscribe();
    }
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
      this.hiddenWord = this.word.split('');
      setTimeout(() => {
        this.showResultsPopup();
        this.startGame(true);
      }, 3000);
    }
  }

  processKeyPress(event: KeyboardEvent) {
    const letter = event.key.toLowerCase();

    if (this.letters.includes(letter)) {
      this.guessLetter(letter);
    } else {
      event.preventDefault();
    }
  }

  showResultsPopup() {
    this.gameResultsService.addResult(this.playerName, this.score);
    this.showResults = true;
  }

  loadResults() {
    this.resultsSubscription = this.gameResultsService
      .getResults()
      .subscribe((results) => {
        this.results = results;
      });
  }

  closeResultsPopup() {
    this.showResults = false;
  }

  addResult(playerName: string, score: number): void {
    this.gameResultsService.addResult(playerName, score);
  }

  showNicknameModal() {
    const dialogRef = this.dialog.open(NicknameModalComponent, {
      disableClose: true,
    });

    dialogRef.componentInstance.onNicknameSaved.subscribe((nickname) => {
      this.playerName = nickname;
      document.addEventListener('keydown', this.processKeyPress.bind(this));
    });

    dialogRef.afterClosed().subscribe((nickname) => {
      document.removeEventListener('keydown', this.processKeyPress.bind(this));
    });
  }
}
