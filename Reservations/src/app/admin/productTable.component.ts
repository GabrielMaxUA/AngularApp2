import { Component, IterableDiffer, IterableDiffers, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  templateUrl: "productTable.component.html"
})
export class ProductTableComponent {

  colsAndRows: string[] = ['id', 'name', 'category', 'price', 'timeFrame', 'buttons'];
  dataSource: MatTableDataSource<Product>; // Define without initialization
  differ: IterableDiffer<Product>;


  @ViewChild(MatPaginator)
  paginator? : MatPaginator

  constructor(private repository: ProductRepository, differs: IterableDiffers) {
    // Now repository is available, initialize dataSource and differ here
    this.dataSource = new MatTableDataSource<Product>(this.repository.getProducts());
    this.differ = differs.find(this.repository.getProducts()).create();
  }

  ngDoCheck() {
    const changes = this.differ?.diff(this.repository.getProducts());
    if (changes != null) {
      this.dataSource.data = this.repository.getProducts();
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
    this.dataSource.paginator = this.paginator;
    }
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }
}
