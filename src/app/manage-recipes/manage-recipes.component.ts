import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { IRecipe } from 'src/model/IRecipe';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrls: ['./manage-recipes.component.css']
})
export class ManageRecipesComponent implements OnInit,OnDestroy {
  recipeList:IRecipe[];
  recipeListFiltered:IRecipe[];
  subscription:Subscription;
  faFile=faFile;

  constructor(private recipeService:RecipeService,private route:Router,private router:ActivatedRoute,
    private spinner: NgxSpinnerService,private toastr: ToastrService) { 
    
  }

  filter(query:string){
    this.recipeListFiltered=(query)?this.recipeList.filter(r=>r.title.toLowerCase().includes(query.toLowerCase())):this.recipeList;
 }

  async ngOnInit() {
   
    this.spinner.show();
    this.subscription= await this.recipeService.getRecipesWithOutImage().subscribe(r=>{
      
      this.recipeList=this.recipeListFiltered=r;
      setTimeout(()=>{this.spinner.hide()},2000);
    });
    
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

}
