import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameResultsService {
  private readonly RESULTS_KEY = '/results';

  constructor(private db: AngularFireDatabase) {}

  addResult(playerName: string, score: number): void {
    this.db.list(this.RESULTS_KEY).push({ playerName, score });
  }

  getResults() {
    return this.db
      .list(this.RESULTS_KEY)
      .valueChanges()
      .pipe(
        map((results: any[]) => {
          results.sort((a, b) => b.score - a.score);
          return results;
        })
      );
  }
}
