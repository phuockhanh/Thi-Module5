import { ProductDto } from './../dtos/product.dto';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ["",[Validators.required, Validators.maxLength(30)]],
      title: ["",[Validators.required, Validators.maxLength(30)]],
      author : ["",[Validators.required, Validators.maxLength(30)]],
      description : ["",[Validators.required, Validators.maxLength(30)]],
    })

  }


  submit(){
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsDirty());

    if (this.form.invalid) return;

    const {id, title,author,description} = this.form.value;
    const productDto: ProductDto = {
      id:id,
      title: title,
      author: author,
      description:description,
    } as ProductDto;
    
    this.productService.add(productDto).subscribe(
      res => {
        this.toastrService.success("Create new product successfully!", productDto.title);
        this.form.reset();
      },
      error => this.toastrService.error(error.message)
    )
  }
}
