import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class popUp {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [panelClass],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
