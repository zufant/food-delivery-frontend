import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  selector: 'app-add-menu-item-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.scss'],
  providers: [ApiService]
})
export class AddMenuItemDialogComponent implements OnInit {
  name = '';
  price = 0;
  category_id = '';
  description = '';
  categories: any[] = [];
  isEditMode = false;
  itemId: number | null = null;
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<AddMenuItemDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCategories();
    
    if (this.data) {
      console.log('Menu item data:', this.data);
      this.isEditMode = true;
      this.itemId = this.data.itemid;
      this.name = this.data.name;
      this.price = this.data.price;
      this.category_id = this.data.categoryid;
      this.description = this.data.description;
    }
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.showSnackbar('Something wrong while fetching categories:', 'error');
      }
    );
  }

    save(form: NgForm): void {
      console.log('editable mode:  itemId', this.isEditMode, this.itemId);
      this.submitted = true;
  
      if (form.invalid) {
        return; 
      }
      const menuItem = {
        name: this.name,
        price: this.price,
        category_id: this.category_id,
        description: this.description,
      };
     
      if (this.isEditMode && this.itemId) {
        this.apiService.updateMenuItem(this.itemId, menuItem).subscribe(
          (response) => {
            console.log('Menu item updated:', response);
            this.showSnackbar('Menu item updated:', 'success');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating menu item:', error);
            this.showSnackbar('Something wrong while updating menu item:', 'error');
          }
        );
      } else {
        this.apiService.addMenuItem(menuItem).subscribe(
          (response) => {
            console.log('Menu item added:', response);
            this.showSnackbar('Menu item added:', 'success');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error adding menu item:', error);
            this.showSnackbar('Something wrong while adding menu item:', 'error');
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
