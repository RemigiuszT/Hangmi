import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameResultsService {
  results: any[] = [
    { playerName: 'Jan', score: 5 },
    { playerName: 'Anna', score: 8 },
    { playerName: 'Jordan', score: 10 },
    { playerName: 'Kerry', score: 12 },
    { playerName: 'Sam', score: 16 },
    { playerName: 'David', score: 32 },
  ];

  constructor() {}

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
