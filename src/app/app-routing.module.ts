import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetalleComponent } from './components/detalle/detalle.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
