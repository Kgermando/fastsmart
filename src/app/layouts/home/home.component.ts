import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/data/product.service';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/data/cart.service';
import { SpinnerService } from 'src/app/shared/services/data/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchTerm = '';

  products$: Product;

  products: Product;

  public rating$: Product;

  public rating: number = 3;
  public color: string = 'accent';
  public starCount: number = 5;
  ratingArr = [];

  constructor(private productService: ProductService,
              private router: Router,
              private cartService: CartService,
              private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.productService.getProductBySupplier().subscribe(
      list => {
          const products = list.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            }
          });
        this.products$ = products;
      }
    );

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  detail(id) {
    this.router.navigate(['/fastsmart/layouts/view', id]);
  }

  
  openSuccessBar() {
    this.spinnerService.openSnackBar({
      data: { message: "Ajouté au panier avec succès" },
      duration: 8,
      panelClass: ["default-snackbar"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  addToCart() {
    this.openSuccessBar();
  }




  search() {
    if(this.searchTerm){
      this.router.navigate(['search', {query: this.searchTerm}]);
    }
  }

}
