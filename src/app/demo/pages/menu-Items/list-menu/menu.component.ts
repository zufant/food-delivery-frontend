import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddMenuItemDialogComponent } from '../add-menu-dialog/add-menu-dialog.component';
import { ApiService } from 'src/app/api.service';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteMenuConfirmationDialog } from '../delete-menu-dialog/delete-menu-confirmation-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [SharedModule,MatIconModule,SharedModule,MatTooltipModule,MatPaginatorModule,MatSnackBarModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [ApiService] 
})
export default class MenuComponent {
  menuItems: any[] = [];
  pageSize: number = 5; 
  pageIndex: number = 0; 
  totalItems: number = 0; 
  constructor( public dialog: MatDialog, private apiService: ApiService,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadMenuItems();
  }
  loadMenuItems(): void {
    this.apiService.getMenuItemsByRestaurant().subscribe(
      (data) => {
        this.menuItems = data;
        this.totalItems = data.length;
        
      },
      (error) => {
        console.error('Error fetching menu items:', error);
        this.showSnackbar('Something wrong while fetching menu items:', 'error');
      }
    );
  }
    openDialog(): void {
      const dialogRef = this.dialog.open(AddMenuItemDialogComponent, {
        width: '30vw',  
        height: '80vh', 
        maxWidth: '100%', 
        maxHeight: '100%',
        panelClass: 'custom-dialog' 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadMenuItems(); 
        }
      });
    }

    updateDialog(item?: any): void {
        const dialogRef = this.dialog.open(AddMenuItemDialogComponent, {
          width: '30vw',
          height: '60vh',
          maxWidth: '100%',
          maxHeight: '100%',
          panelClass: 'custom-dialog',
          data: item 
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadMenuItems(); 
          }
        });
      }
    
      confirmDelete(item: any): void {
        const dialogRef = this.dialog.open(DeleteMenuConfirmationDialog, {
          width: '400px',
          data: item
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Confirmed delete for:', item); 
            this.deleteCategory(item);
          }
        });
      }
    
      deleteCategory(item: any): void {
        this.apiService.deleteMenu(item.itemid).subscribe(
          () => {
            console.log('menu deleted successfully');
            this.showSnackbar('menu deleted successfully', 'success');
            this.loadMenuItems(); 
          },
          (error) => {
            console.error('Error deleting menu:', error);
            this.showSnackbar('Something wrong while deleting menu:', 'success');
          }
        );
      }

      onPageChange(event: any): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      }
    
      getPaginatedItems(): any[] {
        const startIndex = this.pageIndex * this.pageSize;
        return this.menuItems.slice(startIndex, startIndex + this.pageSize);
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
