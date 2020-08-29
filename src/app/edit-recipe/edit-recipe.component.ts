import { Component, OnInit, OnDestroy, ViewChild, ElementRef  } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { IRecipe } from 'src/model/IRecipe';
import { Subscription } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {faFilePdf,faUndo,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
  
})
export class EditRecipeComponent implements OnInit,OnDestroy {
  id:number;
  recipe:IRecipe;
  subscription:Subscription;
  faFilePdf = faFilePdf;
  faUndo=faUndo;
  faEdit=faEdit;
  @ViewChild('recipeContent') recipeContent:ElementRef;
 
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute,
    private spinner: NgxSpinnerService,private toastr: ToastrService) { 
    this.id=parseInt(route.snapshot.paramMap.get('id'));
  }

  savePdf(){
    try{
      this.spinner.show();
      let doc=new jsPDF();
    
    
    let content=this.recipeContent.nativeElement;
    console.log(this.recipeContent.nativeElement);
    html2canvas(content,{
      scrollX: 0,
      scrollY: 0,
      height:1020
    }).then((canvas)=>{
      
      console.log(canvas.height);
      // canvas.height=750;
      var imageData=canvas.toDataURL('image/png');
      console.log(imageData);
      var imageHeight= canvas.height * 208/canvas.width;
      
      
      doc.addImage(imageData,0,0,208,imageHeight);
      doc.save('recipe-image.pdf');
      this.spinner.hide();
      this.showSuccess();
    });
    }
    catch(err)
    {
      this.spinner.hide();
      this.showFailed();
    }
    
    
    
  }

  showSuccess() {
    this.toastr.success('Exported Successfully!!');
  }
  showFailed() {
    this.toastr.error("Failed!!");
  }
  ngOnInit(): void {
    this.spinner.show();
    this.subscription=this.recipeService.getRecipe(this.id).subscribe(r=>{
      this.recipe=r;
      
    });
    setTimeout(() => {
      
      this.spinner.hide();
    }, 2000);
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

}
