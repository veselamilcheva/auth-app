import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {IphoneComponent} from './product/iPhone/iphone.component';
import {WatchComponent} from './product/Watch/watch.component';
import {ProductComponent} from './product/product.component';



const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: 'product', children: [
    { path: '', component: ProductComponent },
    { path: 'iphone', component: IphoneComponent },
    { path: 'watch', component: WatchComponent }
  ] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
