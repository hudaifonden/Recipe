import { Injectable } from '@angular/core';
import { ILevel } from 'src/model/ILevel';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  levels:ILevel[]=new Array();
  constructor() { 
    let level1:ILevel={} as ILevel;
    let level2:ILevel={} as ILevel;
    let level3:ILevel={} as ILevel;
    level1.id=1;
    level1.description="Easy";
    level2.id=2;
    level2.description="Medium";
    level3.id=3;
    level3.description="Hard";
    this.levels.push(level1);
    this.levels.push(level2);
    this.levels.push(level3);
  }

  getLevel(){

  }
  getLevels(){
    return this.levels;
  }
  addLevel(){

  }
}
