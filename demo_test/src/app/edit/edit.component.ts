import { ProductDto } from './../dtos/product.dto';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ["",[Validators.required, Validators.maxLength(30)]],
      title: [Validators.required],
      author : ["",[Validators.required, Validators.maxLength(30)]],
      description : ["",[Validators.required, Validators.maxLength(30)]],
    })
    this.id = this.route.snapshot.params.id;
    this.productService.getById(this.id).subscribe(
      (      res: { title: any; author: any; description: any; }) => this.form.patchValue({
        title: res.title,
        author: res.author,
        description : res.description
      })
    )
  }


  submit(){
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsDirty());

    if (this.form.invalid) return;

    const {id,title,author,description} = this.form.value;


    const productDto: ProductDto = {
      id: id,
      title: title,
      author: author,
      description:description
    } as ProductDto;

    this.productService.update(this.id, productDto).subscribe(
      res => {
        this.toastrService.success("Update   product successfully!", productDto.title);
        this.form.reset();

      },
      error => this.toastrService.error(error.message)
    )
  }
}
