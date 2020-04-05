import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LayoutsComponent } from './layouts.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { DetailComponent } from './detail/detail.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [HomeComponent, LayoutsComponent,
                 ContactComponent, CategoryComponent,
                 CartComponent, DetailComponent, ProfileComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule
  ]
})
export class LayoutsModule { }
