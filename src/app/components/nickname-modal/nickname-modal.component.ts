import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-nickname-modal',
  templateUrl: './nickname-modal.component.html',
  styleUrls: ['./nickname-modal.component.css'],
})
export class NicknameModalComponent {
  @Output() onNicknameSaved = new EventEmitter<string>();
  nickname: string = '';

  constructor(public dialogRef: MatDialogRef<NicknameModalComponent>) {}

  saveNickname(nickname: string): void {
    this.onNicknameSaved.emit(nickname);
    this.dialogRef.close();
  }
}
