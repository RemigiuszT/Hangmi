import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameResultsService {
  results: any[] = [
    { playerName: 'Jan', score: 10 },
    { playerName: 'Anna', score: 30 },
    { playerName: 'Jordan', score: 40 },
    { playerName: 'Kerry', score: 60 },
    { playerName: 'Sam', score: 90 },
    { playerName: 'David', score: 120 },
  ];

  constructor() {}

  addResult(playerName: string, score: number): void {
    const existingPlayerIndex = this.results.findIndex(
      (result) => result.playerName === playerName
    );

    if (existingPlayerIndex > -1) {
      if (this.results[existingPlayerIndex].score < score) {
        this.results[existingPlayerIndex].score = score;
      }
    } else {
      this.results.push({ playerName, score });
    }
    this.sortResults();
  }

  sortResults() {
    this.results.sort((a, b) => {
      return b.score - a.score;
    });
  }
}
