import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


const routes: Routes = [
  { path: '', component: ProductsComponent, children: [
    { path: 'product-add', component: ProductAddComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'product-view/:id', component: ProductViewComponent },
    { path: 'product-edit/:id', component: ProductEditComponent },

    { path: '', redirectTo: 'product-list', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
