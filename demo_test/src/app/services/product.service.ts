import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDto } from '../dtos/product.dto';

const endpoint = 'products/';

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private httpClient: HttpClient){}

  getList(): Observable<ProductDto[]> {
    return this.httpClient.get<ProductDto[]>(endpoint)
  }

  getById(id: string): Observable<ProductDto>{
    return this.httpClient.get<ProductDto>(endpoint + id);
  }

  add(productDto: ProductDto): Observable<ProductDto>{
    return this.httpClient.post<ProductDto>(endpoint, productDto);
  }

  update(id: string, dto: ProductDto): Observable<ProductDto>{
    return this.httpClient.put<ProductDto>(endpoint + id, dto);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(endpoint + id);
  }
}
