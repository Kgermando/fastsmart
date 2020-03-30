import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)},
  { path: 'layouts', loadChildren: () => import('../app/layouts/layouts.module').then(m => m.LayoutsModule)},

  { path: '', redirectTo: 'layouts', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
