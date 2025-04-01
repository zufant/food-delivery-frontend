import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class ApiService {
    private baseUrl = 'http://localhost:3000';  // Your base URL
  
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
      const loginData = {
        email: email,
        password: password,
      };
      return this.http.post<any>(`${this.baseUrl}/auth/login`, loginData);
    }

    getCategories(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/menu-items/categories`);
    }
  
    addMenuItem(menuItem: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/menu-items/add`, menuItem);
    }

    getMenuItemsByRestaurant(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/menu-items/restaurant`);
    }

    addCategory(categoryData: { name: string; description: string }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/menu-items/categories/add`, categoryData);
    }

    updateCategory(categoryId: number, categoryData: { name: string; description: string }): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/menu-items/categories/update/${categoryId}`, categoryData);
    }

    deleteCategory(categoryId: number) {
        return this.http.delete(`http://localhost:3000/menu-items/categories/delete/${categoryId}`);
    }
    deleteMenu(menuItemId: number) {
        return this.http.delete(`http://localhost:3000/menu-items/${menuItemId}`);
    }
    
    updateMenuItem(id: number, menuItem: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/menu-items/${id}`, menuItem);
    }

    getMenuItems(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/menu-items/restaurant`);
    }

    getAllMenuItems(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/menu-items/`);
  }

    getRestaurants(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/restaurants/all`);
    }

    getCategoriesByRestaurantId(restaurantId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/menu-items/categories/${restaurantId}`);
    }

    getMenuItemsByCategoryId(categoryId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/menu-items/category/${categoryId}`);
    }
  }
  