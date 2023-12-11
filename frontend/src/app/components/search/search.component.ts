import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../json.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesComponent } from '../sales/sales.component';
import { EquipmentsComponent } from '../equipments/equipments.component';
import { PurchasesComponent } from '../purchases/purchases.component';
import { WorkforceComponent } from '../workforce/workforce.component';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../../interfaces/Product';
import { Sale } from '../../interfaces/Sale';
import { Equipment } from '../../interfaces/Equipment';
import { Purchase } from '../../interfaces/Purchase';
import { Workforce } from '../../interfaces/Workforce';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SalesComponent,
    PurchasesComponent,
    ProductsComponent,
    EquipmentsComponent,
    WorkforceComponent,
    LoaderComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  isLoading: boolean = false;
  show: boolean = false;
  sales: Sale[] = [];
  purchases: Purchase[] = [];
  equipments: Equipment[] = [];
  products: Product[] = [];
  workforce: Workforce[] = [];
  ErrMessage: string = '';

  constructor(private jsonService: JsonService) {}

  ngOnInit() {}

  search() {
    // Hide the divs under the search input box on start up
    this.show = false;
    if (!this.searchQuery) {
      // If no search term given show alert and disable loader
      alert('You should enter a text');
      this.isLoading = false;
    } else {
      // Show the loader while searching
      this.isLoading = true;
      const result = this.jsonService
        .searchWithTerm(this.searchQuery)
        .subscribe(
          (response) =>
            // simulate delay for search
            setTimeout(() => {
              // load results in variables to show search results
              this.sales = response.sales;
              this.purchases = response.purchases;
              this.products = response.products;
              this.equipments = response.equipments;
              this.workforce = response.workforce;
              this.isLoading = false;
              this.show = true;
            }, 2000),
          (error) => {
            // hide results, loader and show error below search
            this.show = false;
            this.isLoading = false;
            this.ErrMessage = error;
          }
        );
    }
  }

  // Function to hide results by emptying arrays of sales, purchases, products, equipments
  // and workforce
  hideResults = (event: Event) => {
    if ((<HTMLInputElement>event.target).value.length === 0) {
      this.sales.length = 0;
      this.purchases.length = 0;
      this.products.length = 0;
      this.equipments.length = 0;
      this.workforce.length = 0;
      this.show = false;
      this.ErrMessage = '';
    }
  };
}
