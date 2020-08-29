import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { LevelService } from '../level.service';
import { RecipeService } from '../recipe.service';
import { Router,ActivatedRoute } from '@angular/router';

import { IRecipe } from 'src/model/IRecipe';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  levels;
  id:number=0;
  recipe:IRecipe;

  constructor(private levelService:LevelService,private fb:FormBuilder,private recipeService:RecipeService,
    private router:Router,private route:ActivatedRoute,private spinner: NgxSpinnerService,private toastr: ToastrService) { 
    
      
      this.id=parseInt(route.snapshot.paramMap.get('id'));
    
      this.levels=levelService.getLevels();
      this.loadRecipefromId();
     
    
  }
  loadRecipefromId(){
    if(this.id) {
      try{
        this.spinner.show();
        this.recipeService.getRecipe(this.id).subscribe(r=>{
          this.recipe=r;
          this.recipeForm.patchValue({title:this.recipe.title});
          this.recipeForm.patchValue({level:this.recipe.level});
          if (this.recipe.image1){
            this.recipeForm.patchValue({image1File:this.base64toFile(this.recipe.image1)});
          }
          if (this.recipe.image2){
            this.recipeForm.patchValue({image2File:this.base64toFile(this.recipe.image2)});
          }
          if (this.recipe.image3){
            this.recipeForm.patchValue({image3File:this.base64toFile(this.recipe.image3)});
          }
          
          this.recipeForm.patchValue({recipeId:this.recipe.recipeID});
          
          if ((this.recipe.ingredients as Array<string>).length>0){
            this.clearIngredients();
            for (const ing of this.recipe.ingredients) {
              
              this.addIngredient(ing);
            }
          }
          if ((this.recipe.steps as Array<string>).length>0){
            this.clearSteps();
          
            for (const stp of this.recipe.steps) {
              this.addStep(stp);
            }
          }
          
          
          setTimeout(()=>{this.spinner.hide()},2000);
          
          
          
        });
      }
      catch(err){
        this.spinner.hide();
        this.showFailed();
      }
      
      
    }
    else{
      this.id=0;
    }
    
  }
  base64toFile(data) {
    const byteString = window.atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {  });    
    const imageFile = new File([blob], 'Image', { });
    return imageFile;
 }
  save(){
    try{
      console.log(this.recipeForm);
      this.spinner.show();
      this.recipeService.addRecipe(toFormData(this.recipeForm.value)).subscribe(e=>{
        this.spinner.hide();
        this.showSuccess();
        setTimeout(()=>{
        this.router.navigate(['/managerecipe']);
      },2000);
      });
      
      
    }
    catch(err){
      this.showFailed();
    }
  }

  recipeForm=this.fb.group({
    recipeId:['0'],
    title:['',Validators.required],
    image1:[],
    image1File:[],
    image2:[],
    image2File:[],
    image3:[],
    image3File:[],
    ingredients:this.fb.array([]),
    steps:this.fb.array([]),
    level:[]
  });

 
  get ingredients(){
    return this.recipeForm.get('ingredients') as FormArray
  }
  addIngredient(val?:string){
    this.ingredients.push(this.fb.control(val));
  }
  clearIngredients(){
    while(this.ingredients.length!=0){
      this.ingredients.removeAt(0);
    }
  }

  get steps(){
    return this.recipeForm.get('steps') as FormArray;
  }

  addStep(val?:string){
    this.steps.push(this.fb.control(val));
  }
  clearSteps(){
    while(this.steps.length!=0){
      this.steps.removeAt(0);
    }
  }

  onImage1Change(event){
    if (event.target.files.length>0){
      const file:File=event.target.files[0];
      
      this.recipeForm.patchValue({image1File:file
      });
    }
  }

  onImage2Change(event){
    if (event.target.files.length>0){
      const file:File=event.target.files[0];
      
      this.recipeForm.patchValue({image2File:file
      });
    }
  }

  onImage3Change(event){
    if (event.target.files.length>0){
      const file:File=event.target.files[0];
      
      this.recipeForm.patchValue({image3File:file
      });
    }
  }
  showSuccess() {
    this.toastr.success('Saved Successfully!!');
  }
  showFailed() {
    this.toastr.error("Failed!!");
  }

  ngOnInit(): void {
    this.addStep();
    this.addIngredient();
  }
  

}

export function toFormData<T>( formValue: T ) {
  
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }
  
  return formData;
  
}