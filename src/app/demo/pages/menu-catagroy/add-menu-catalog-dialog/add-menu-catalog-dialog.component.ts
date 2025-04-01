import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  selector: 'app-add-menu-dialog',
  templateUrl: './add-menu-catalog-dialog.component.html',
  styleUrls: ['./add-menu-catalog-dialog.component.scss']
})
export class AddMenuDialogComponent {
  name: string = ''; 
  description: string = ''; 
  categoryId: number | null = null; 
  submitted = false;

  constructor(
    private dialogRef: MatDialogRef<AddMenuDialogComponent>,
    private apiService: ApiService, 
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      
      this.categoryId = data.category_id;
      this.name = data.name;
      this.description = data.description;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(form: NgForm): void {
    this.submitted = true; 

    if (form.invalid) {
      return; 
    }
    const categoryData = {
      name: this.name,
      description: this.description
    };

    if (this.categoryId) {
      
      this.apiService.updateCategory(this.categoryId, categoryData).subscribe(
        (response) => {
          console.log('Category updated successfully', response);
          this.showSnackbar('Category updated successfully', 'success');
          this.dialogRef.close(response); 
        },
        (error) => {
          console.error('Error updating category:', error);
          this.showSnackbar('Error updating category:', 'error');
        }
      );
    } else {
      
      this.apiService.addCategory(categoryData).subscribe(
        (response) => {
          console.log('Category added successfully', response);
          this.showSnackbar('Category added successfully', 'success');
          this.dialogRef.close(response); 
        },
        (error) => {
          console.error('Error adding category:', error);
          this.showSnackbar('Error adding category:', 'error');
        }
      );
    }
  }
  showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
