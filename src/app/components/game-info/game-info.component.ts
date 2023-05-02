import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent {
  @Input() category: string;
  @Input() lives: number;
  @Input() usedLetters: string;
  @Input() showWord: boolean;
  @Input() word: string;
  @Input() score: number;

  constructor() {
    this.category = '';
    this.lives = 0;
    this.usedLetters = '';
    this.showWord = false;
    this.word = '';
    this.score = 0;
  }
}
