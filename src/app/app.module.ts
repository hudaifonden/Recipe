import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxDataTableModule} from "angular-9-datatable";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
// import {  } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { LevelService } from './level.service';
import { RecipeService } from './recipe.service';
import { ManageRecipesComponent } from './manage-recipes/manage-recipes.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    
    AppComponent,
    NewRecipeComponent,
    ManageRecipesComponent,
    EditRecipeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDataTableModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    // AngularFontAwesomeModule,
    FontAwesomeModule
  ],
  providers: [LevelService,RecipeService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
