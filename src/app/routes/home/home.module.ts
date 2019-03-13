import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ArtefactModule } from '../../shared/artefact.module';
const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        ArtefactModule,
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule,
        ArtefactModule,
    ]
})
export class HomeModule { }
