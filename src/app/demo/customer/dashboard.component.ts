import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/app/api.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, 
    SharedModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems: any[] = []; 
  searchName: string = '';
  searchCategory: string = ''; 
  selectedRestaurantId: number | null = null;
  selectedCategoryId: number = null;
  filteredMenuItems: any[] = [];
  restaurants: any[] = [];
  categories: any[] = []; 
  all: String="";
  constructor(private apiService: ApiService,private snackBar: MatSnackBar) {}
  ngOnInit() {

    this.getMenuItems(); 
    this.loadCategories();
   
  }

  getRestaurants(): void {
    this.apiService.getRestaurants().subscribe(
      (data: any[]) => {
        this.restaurants = data; 
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
        this.showSnackbar('Something wrong while fetching restaurants:', 'error');
      }
    );
  }
  getMenuItems(): void {
    this.apiService.getAllMenuItems().subscribe(
      (data: any[]) => {
        this.menuItems = data;  
      },
      (error) => {
        console.error('this is the catched error:', error);
        this.showSnackbar('Something wrong while fetching menu items:', 'error');
      }
    );
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(
      (data) => {
        this.categories = data;
       
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.showSnackbar('Something wrong while fetching catagories:', 'error');
      }
    );
  }
  onRestaurantSelect(): void {
    if (this.selectedRestaurantId) {
      this.apiService.getCategoriesByRestaurantId(this.selectedRestaurantId).subscribe(
        (categories: any[]) => {
          this.categories = categories; 
        },
        (error) => {
          this.showSnackbar('Error fetching menu catagories:', 'error');
        }
      );
    }
  }

  onCategoryChange(): void {
    
    if(this.selectedCategoryId === null){
      this.getMenuItems()
    }else{
      this.apiService.getMenuItemsByCategoryId(this.selectedCategoryId).subscribe(
        (data: any[]) => {
          console.log('filtered data:', data);
          this.menuItems = data; 
        },
        (error) => {
          console.error('Error fetching menu items:', error);
          this.showSnackbar('Menu items not available:', 'error');
        });
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



