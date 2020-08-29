import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { ManageRecipesComponent } from './manage-recipes/manage-recipes.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';


const routes: Routes = [
  { path:'*',component:ManageRecipesComponent },
  { path:'',component:ManageRecipesComponent },

  { path:'managerecipe',component:ManageRecipesComponent },
  { path:'createrecipe',component:NewRecipeComponent },
  { path:'editrecipe/:id',component:NewRecipeComponent },
  { path:'viewrecipe/:id',component:EditRecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
