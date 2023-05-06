import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameResultsService } from '../../services/game-result.service';

@Component({
  selector: 'app-nickname-modal',
  templateUrl: './nickname-modal.component.html',
  styleUrls: ['./nickname-modal.component.css'],
})
export class NicknameModalComponent {
  @Output() onNicknameSaved = new EventEmitter<string>();
  nickname: string = '';
  nicknameInvalid: boolean = false;

  constructor(public dialogRef: MatDialogRef<NicknameModalComponent>) {}

  saveNickname(nickname: string): void {
    if (nickname.trim().length < 2) {
      this.nicknameInvalid = true;
    } else {
      this.onNicknameSaved.emit(nickname.trim());
      this.dialogRef.close();
    }
  }
}
