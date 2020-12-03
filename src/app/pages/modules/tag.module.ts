import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagListComponent } from 'tag/tag-list/tag-list.component';
import { TagRoutingModule } from './tag-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';


import { HeaderLanguageComponent } from 'shared/header-language/header-language.component';
import { TagDeleteComponent } from 'tag/tag-delete/tag-delete.component';
import { TagUpdateComponent } from 'tag/tag-update/tag-update.component';
import { DragAndDropFileComponent } from 'src/app/shared/drag-and-drop-file/drag-and-drop-file.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [TagListComponent, HeaderLanguageComponent, TagDeleteComponent, TagUpdateComponent, DragAndDropFileComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  exports: [ TagListComponent, HeaderLanguageComponent, TagDeleteComponent, TagUpdateComponent, DragAndDropFileComponent]
})
export class TagModule { }
