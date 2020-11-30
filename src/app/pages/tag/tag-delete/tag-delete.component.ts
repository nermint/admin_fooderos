import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// alertify
declare let alertify: any;

@Component({
  selector: 'app-tag-delete',
  templateUrl: './tag-delete.component.html',
  styleUrls: ['./tag-delete.component.css']
})
export class TagDeleteComponent implements OnInit {

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    // console.log(' TAG DELETE COMPONENT');
    // console.log(this.data);
  }

  deleteTag(){
    this.authService.deleteTag({ id: this.data.tagElement.id }).subscribe( result => {
      alertify.success('Tag deleted');
      this.data.getTagsData();
      console.log(result);
    } );
  }

}
