import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Login Sample';

  languages: string[] = ['az', 'en', 'ru', 'tr'];


  constructor(){
  }

  ngOnInit(){
    localStorage.setItem('languages', this.languages.toString());
  }





}
