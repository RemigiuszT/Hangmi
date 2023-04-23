import { Component } from '@angular/core';
import { words } from './words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Hangmi';
  word = '';
  hiddenWord: string[] = [];
  letters = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż';
  usedLetters = '';
  lives = 7;
  score = 0;
  showWord = false;
  category = '';

  results: any[] = [
    { playerName: 'Jan', score: 5 },
    { playerName: 'Anna', score: 8 },
    { playerName: 'Jordan', score: 10 },
    { playerName: 'Kerry', score: 12 },
    { playerName: 'Sam', score: 16 },
    { playerName: 'David', score: 32 },
  ];

  constructor() {
    this.startGame();
  }

  showResults: boolean = false;

  startGame() {
    this.lives = 7;
    this.usedLetters = '';
    const randomWordObj = this.getRandomWord();
    this.word = randomWordObj.word.toLowerCase();
    this.category = randomWordObj.category;
    this.hiddenWord = Array(this.word.length).fill('_');
    this.showWord = false;
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
      alert('You won!');
      this.showWord = true;
    } else if (this.lives <= 0) {
      alert('Defeat!');
      this.showWord = true;
      this.showResultsPopup();
    }
  }

  onKeydown(event: KeyboardEvent) {
    const letter = event.key.toLowerCase();
    if (this.letters.includes(letter)) {
      this.guessLetter(letter);
    }
  }

  showResultsPopup() {
    const playerName = 'Gracz githuba';
    this.addResult(playerName, this.score);
    this.sortResults();

    this.showResults = true;
  }

  closeResultsPopup() {
    this.showResults = false;
  }

  addResult(playerName: string, score: number): void {
    this.results.push({ playerName, score });
    this.sortResults();
  }

  sortResults() {
    this.results.sort((a, b) => {
      return b.score - a.score;
    });
  }
}
