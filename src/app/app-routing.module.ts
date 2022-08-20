import { SaleComponent } from './home/sale/sale.component';
import { ListComponent } from './home/list/list.component';
import { ConfigComponent } from './home/config/config.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'venda', component:SaleComponent},
  {path:'produtos', component:ListComponent},
  {path:'cadastro', component:RegisterComponent},
  {path:'configuracoes', component:ConfigComponent},
  {path:'',component:SaleComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
