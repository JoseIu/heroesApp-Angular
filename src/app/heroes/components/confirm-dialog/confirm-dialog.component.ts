import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/herto.interface';

@Component({
  selector: 'hero-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: Hero
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onConfrim(): void {
    this.dialogRef.close(true);
  }
}
