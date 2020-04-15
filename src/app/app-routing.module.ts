import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';
import { AuthGuard } from './auth/services/guard/auth.guard';


const routes: Routes = [
  { path: 'fastsmart', loadChildren: () => import('../app/fast-smart/fast-smart.module').then(m => m.FastSmartModule)},

  { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule), 
    canActivate: [AuthGuard]},

  { path: '', redirectTo: 'fastsmart', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
