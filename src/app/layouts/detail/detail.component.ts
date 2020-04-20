import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/data/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product: Product = {};

  constructor(private route: ActivatedRoute,
              private content: ElementRef,
              private productService: ProductService) {}

  
    ngOnInit(): void {
      const id: string = this.route.snapshot.params.id;
      this.getDetails(id);
    }
  
    getDetails(id: string): void {
      // this.spinnerService.showSpinner();
      this.productService.getOneProduct(id).subscribe(product => {
        this.product = product;
        // this.spinnerService.hideSpinner();
      });
    }

}
