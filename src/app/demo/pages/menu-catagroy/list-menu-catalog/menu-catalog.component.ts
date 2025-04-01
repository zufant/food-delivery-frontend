import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteConfirmationDialog } from '../delete-menu-catagroy-dialog/delete-catagory-confirmation-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddMenuDialogComponent } from '../add-menu-catalog-dialog/add-menu-catalog-dialog.component';
import { SnackbarService } from 'src/app/theme/shared/service/snackbar.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [MatIconModule,SharedModule, NgbDropdownModule,MatTooltipModule,MatPaginatorModule,MatTableModule, MatIconModule,MatPaginatorModule, MatSnackBarModule],
  templateUrl: './menu-catalog.component.html',
  styleUrls: ['./menu-catalog.component.scss'],
  providers: [ApiService] 
})
export default class MenuCatalogComponent implements OnInit {
  categories: any[] = []; 
  pageSize: number = 5; 
  pageIndex: number = 0; 
  totalItems: number = 0;
  
  constructor(public dialog: MatDialog, private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCategories(); 
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        this.totalItems = data.length;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.showSnackbar('Error fetching categories:', 'error');
      }
    );
  }

  addDialog(): void {
    const dialogConfig = this.getDialogConfig();
    const dialogRef = this.dialog.open(AddMenuDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if (result)
          this.loadCategories();
      }, (error) => {
        console.error('An unexpected error occurred. Please try again.');
      });

  }

  updateDialog(category?: any): void {
    const dialogRef = this.dialog.open(AddMenuDialogComponent, {
      width: '30vw',
      height: '60vh',
      maxWidth: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog',
      data: category 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories(); 
      }
    });
  }

  confirmDelete(category: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      width: '400px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed delete for:', category); 
        this.deleteCategory(category);
      }
    });
  }

  deleteCategory(category: any): void {
    this.apiService.deleteCategory(category.category_id).subscribe(
      () => {
        console.log('Category deleted successfully');
        this.showSnackbar('Category deleted successfully', 'success');
        this.loadCategories();
      },
      (error) => {
        console.error('Error deleting category:', error);
        this.showSnackbar('you cannot delete this catagory', 'error');
      }
    );
  }
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getPaginatedItems(): any[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.categories.slice(startIndex, startIndex + this.pageSize);
  }

  private getDialogConfig() {
    const width = window.innerWidth;
    let dialogWidth = '30vw'; 
    let dialogHeight = '60vh'; 

    if (width <= 600) {
      
      dialogWidth = '30vw';
      dialogHeight = '30vh';
    } else if (width <= 960) {
      
      dialogWidth = '50vw';
      dialogHeight = '30vh';
    }

    return {
      width: dialogWidth,
      height: dialogHeight,
      maxWidth: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog'
    };
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
