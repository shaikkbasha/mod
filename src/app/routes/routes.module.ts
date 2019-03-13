import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AccessDeniedComponent } from './error/access-denied/access-denied.component';

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [AccessDeniedComponent],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {

}
