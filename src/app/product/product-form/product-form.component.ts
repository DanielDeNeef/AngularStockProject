import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { FileSaverService } from 'src/app/file-saver.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product;

  fileToUpload: File;

  constructor(private productService: ProductService,
    private route: Router,
    private filSaver: FileSaverService) { }

  ngOnInit() {
    this.product = this.productService.getProduct();
  }

  saveProduct() {

    const fd = new FormData();

    if (this.fileToUpload != null) {
      fd.append('file', this.fileToUpload)
      this.filSaver.saveFile(fd).subscribe();

      this.product.prodPictureUrl = "http://localhost:8080/picture/" + this.fileToUpload.name;
    }

    this.productService.createProduct(this.product).subscribe((data) => console.log(data));
    this.route.navigate(['/products']);
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => { this.product.prodPictureUrl = event.target.result; }

    reader.readAsDataURL(this.fileToUpload);

  }


}
