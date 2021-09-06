import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from '../dtos/product.dto';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  title = 'Product list';

  products: ProductDto[] = [];

  constructor(
    private _productService: ProductService,
    private toastrService: ToastrService
    ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts():void {
    this._productService.getList().subscribe(
      res => this.products = res
    )
  }

  deleteProduct(product: ProductDto): void {
    if(confirm("Are you sure to delete ")){
      this._productService.delete(product.id).subscribe(
        res => {
          this.products = this.products.filter(d => d != product);
          this.toastrService.success("Delete product successfully")
        },
        error => this.toastrService.error("Something went wrong!")
      )
    }
    
  }

}
