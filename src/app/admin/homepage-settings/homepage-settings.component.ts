import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage-settings',
  templateUrl: './homepage-settings.component.html',
  styleUrl: './homepage-settings.component.scss'
})
export class HomepageSettingsComponent {
  isSurvey:boolean=false;
  isImdbStory:boolean=false;
  isCarousel:boolean=false;

  openSurvey(value:boolean):void{
    if(value)
      this.isSurvey = false
    else if(!value)
      this.isSurvey = true
}
openStory(value:boolean):void{
  if(value)
    this.isImdbStory = false
  else if(!value)
    this.isImdbStory = true
}
openCarousel(value:boolean):void{
  if(value)
    this.isCarousel = false
  else if(!value)
    this.isCarousel = true
}



}
