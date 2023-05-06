import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameResultsService {
  private readonly RESULTS_KEY = '/results';

  constructor(private db: AngularFireDatabase) {}

  addResult(playerName: string, score: number): void {
    this.checkForExistingNickname(playerName).subscribe((exists) => {
      if (exists) {
        this.updateExistingPlayerScore(playerName, score);
      } else {
        this.db.list(this.RESULTS_KEY).push({ playerName, score });
      }
    });
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

  checkForExistingNickname(nickname: string): Observable<boolean> {
    return this.db
      .list('/results', (ref) =>
        ref.orderByChild('playerName').equalTo(nickname)
      )
      .snapshotChanges()
      .pipe(
        map((changes) => changes.length > 0),
        take(1)
      );
  }

  private updateExistingPlayerScore(playerName: string, score: number): void {
    this.db
      .list(this.RESULTS_KEY, (ref) =>
        ref.orderByChild('playerName').equalTo(playerName)
      )
      .snapshotChanges()
      .pipe(
        take(1),
        map((changes) => {
          const key = changes[0].key;
          const currentScore = (changes[0].payload.val() as any).score;
          return { key, currentScore };
        })
      )
      .subscribe(({ key, currentScore }) => {
        if (key && score > currentScore) {
          this.db.list(this.RESULTS_KEY).update(key, { playerName, score });
        }
      });
  }
}
