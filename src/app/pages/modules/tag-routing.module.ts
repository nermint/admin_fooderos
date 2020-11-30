import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TagListComponent } from '../tag/tag-list/tag-list.component';
import { HeaderLanguageComponent } from 'src/app/shared/header-language/header-language.component';
import { TagUpdateComponent } from '../tag/tag-update/tag-update.component';

const routes: Routes = [
    { path: '', component: TagListComponent },
    { path: 'create',  component: TagUpdateComponent },
    { path: 'edit/:id', component: TagUpdateComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TagRoutingModule { }
