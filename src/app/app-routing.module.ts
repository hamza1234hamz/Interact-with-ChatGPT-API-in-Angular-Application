import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GptComponent } from './gpt/gpt.component';

const routes: Routes = [

  {
    path : "gpt" ,component:GptComponent
  },
  {
    path: "",redirectTo:"/gpt",pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
