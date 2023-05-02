import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hangman-drawing',
  templateUrl: './hangman-drawing.component.html',
  styleUrls: ['./hangman-drawing.component.css'],
})
export class HangmanDrawingComponent {
  constructor() {}
  @Input() lives: number = 0;
}
