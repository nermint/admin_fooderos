import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from '../core/components/dashboard/dashboard.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { HeaderLanguageComponent } from '../shared/header-language/header-language.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


// material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatExpansionModule,
    MatMenuModule
  ],
  exports:[
    DashboardComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class CoreModule { }

