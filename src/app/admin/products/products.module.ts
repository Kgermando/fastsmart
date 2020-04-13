import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProductsComponent, ProductAddComponent, ProductListComponent, ProductViewComponent, ProductEditComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,

    SharedModule
  ]
})
export class ProductsModule { }
