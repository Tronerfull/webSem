import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideogamesSectionComponent } from './pages/videogamesSection/videogamesSection.component';
import { QueriesSectionComponent } from './pages/QueriesSection/queriesSection.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/videogames'
  },
  {
    path: 'videogames',
    component: VideogamesSectionComponent
  },
  {
    path: 'queries',
    component: QueriesSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
