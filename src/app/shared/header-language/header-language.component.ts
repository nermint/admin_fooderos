import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-header-language',
  templateUrl: './header-language.component.html',
  styleUrls: ['./header-language.component.css']
})
export class HeaderLanguageComponent implements OnInit {



  activeLanguage: string = 'az';
  activeLanguageIndex: number = 0;

  languages;

  constructor() { }


  ngOnInit(): void {
    this.languages = localStorage.getItem('languages').split(',');
  }


  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // console.log(tabChangeEvent.index);
    console.log(tabChangeEvent.tab.textLabel);
    this.activeLanguage = tabChangeEvent.tab.textLabel;
    this.activeLanguageIndex = tabChangeEvent.index;

  }


}
