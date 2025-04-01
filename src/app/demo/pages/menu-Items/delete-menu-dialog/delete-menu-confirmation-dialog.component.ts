import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-menu-confirmation-dialog.component.html',
  styleUrls: ['./delete-menu-confirmation-dialog.component.scss'],
  standalone: true,
   imports: [
      CommonModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      FormsModule,
      MatDialogModule,
    ],
})
export class DeleteMenuConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteMenuConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.data);
  }
}
