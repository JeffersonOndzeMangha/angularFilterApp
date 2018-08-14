import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FilterviewComponent } from './filterview/filterview.component';

const routes:Routes = [
  {
    path: '',
    component: FilterviewComponent,
  },
  {
    path: 'filter',
    component: FilterviewComponent,
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
