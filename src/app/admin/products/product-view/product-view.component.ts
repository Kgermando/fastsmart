import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import { ProductService } from 'src/app/shared/services/data/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  product: Product = {};

  constructor(private route: ActivatedRoute,
    private content: ElementRef,
    private productService: ProductService) {}

    downloadPDF() {
      console.log('Download here');
      const report = new jsPDF();
  
      const specialElementHeaders = {
        '#editor'(element , renderer) {
          return true;
        }
      };
      const content = this.content.nativeElement;
      report.fromHTML(content.innerHTML, 15, 15, {
        width: 150,
        elementHeaders: specialElementHeaders
      });
      report.save('Produit.pdf');
    }
  
    ngOnInit(): void {
      const id: string = this.route.snapshot.params.id;
      this.getDetails(id);
    }
  
    getDetails(id: string): void {
      this.productService.getOneProduct(id).subscribe(product => {
        this.product = product;
      });
    }

}
