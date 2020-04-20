import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  { path: '', component: LayoutsComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'view/:id', component: DetailComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'profile', component: ProfileComponent },

    { path: 'cart', loadChildren: () => import('../layouts/cart/cart.module').then(m => m.CartModule)},

    { path: '', redirectTo: 'home', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
