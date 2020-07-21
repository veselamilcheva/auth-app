import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spinner } from './spinner/spinner';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        Spinner,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        Spinner,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {

}
