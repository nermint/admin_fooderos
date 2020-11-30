import { Component, OnInit } from '@angular/core';
import { sidebarAnimation, iconAnimation, labelAnimation } from 'src/app/animations';
import { SidenavService } from '../../services/sidenav.service';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    sidebarAnimation(),
    iconAnimation(),
    labelAnimation(),
  ]
})
export class SidebarComponent implements OnInit {

  sidebarState: string;
  panelOpenState = false;
  expandedPanelArr: boolean[ ] = [false, false ];
  panelOpenStateArr: boolean [ ] = [ false , false ];
  // expandedPanel: boolean;
  // expandedPanel2:boolean;

  constructor(private sidenavService: SidenavService,
              private router: Router) { }

  ngOnInit(): void {
    this.sidenavService.sidebarStateObservable$.
      subscribe((newState: string) => {
        this.sidebarState = newState;
      });
    this.toggleSideNav();
    console.log(this.router.url);
  }
    toggleSideNav() {
      if (this.sidebarState === 'open'){
        for (let i = 0; i < this.expandedPanelArr.length; i++){
          this.expandedPanelArr[i] = false;
        }
      }
      setTimeout(() => {
        this.sidenavService.toggle();
      }, 200);
    }


  // addActiveToAltTabs(){
  //   const items = document.getElementsByClassName('mat-alt-item');
  //   for ( let i = 0; i < items.length; i++)
  //   {
  //     items[i].addEventListener('click', e => {
  //       this.openAltTab = true;
  //     });
  //   }
  // }



}
