import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { observable } from 'rxjs';
import { IRecipe } from 'src/model/IRecipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url='http://localhost:63240/api';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  constructor(private http:HttpClient) { }
  addRecipe(recipe){
    
    
    
  
    return this.http.post<any>(this.url + '/addRecipe/', recipe);
    
  }
  getRecipe(id:number){
    
 
    return this.http.get<IRecipe>(this.url + '/getRecipe/' + id.toString());
    
  }
  getRecipes(){
    
 
    return this.http.get<any>(this.url + '/getAllRecipe/').subscribe((e)=>{
      
    });
    
  }
  getRecipesWithOutImage(){
    
 
    return this.http.get<any>(this.url + '/getAllRecipesWithoutImage/');
    
  }
}
