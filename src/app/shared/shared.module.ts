import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HasAnyAuthorityDirective } from './directives/auth/has-any-authority.directive';

// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    providers: [
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        HasAnyAuthorityDirective
    ]
})

export class SharedModule { }
