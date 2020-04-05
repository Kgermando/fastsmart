import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: LayoutsComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'cart', component: CartComponent },
    { path: 'profile', component: ProfileComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
