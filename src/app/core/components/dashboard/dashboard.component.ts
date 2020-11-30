import { Component, OnInit } from '@angular/core';
import { mainContentAnimation } from '../../../animations';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    mainContentAnimation()
  ]
})
export class DashboardComponent implements OnInit{

  sidebarState: string;
 

  constructor(
    private sidenavService:SidenavService
  ){ }
  

  ngOnInit(){
    this.sidenavService.sidebarStateObservable$
    .subscribe((newState: string) => {
      this.sidebarState = newState;
    });

    
  }

}
