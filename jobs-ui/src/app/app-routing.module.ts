import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SyncComponent } from './components/sync/sync.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'sync', component: SyncComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
