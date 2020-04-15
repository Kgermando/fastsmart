import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FastSmartComponent } from './fast-smart.component';


const routes: Routes = [
  { path: '', component: FastSmartComponent, children: [
     { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},

    { path: 'layouts', loadChildren: () => import('../layouts/layouts.module').then(m => m.LayoutsModule)},

    { path: '', redirectTo: 'layouts', pathMatch: 'full'}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FastSmartRoutingModule { }
