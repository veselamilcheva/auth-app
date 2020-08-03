import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.modules';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: AuthComponent}, {path: 'signin', component: AuthComponent}, {
      path: 'signup',
      component: AuthComponent
    }])],
  exports: [AuthComponent]
})
export class AuthModule {

}
