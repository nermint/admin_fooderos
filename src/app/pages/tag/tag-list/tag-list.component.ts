import { Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'services/auth.service';
import { environment } from 'environment/environment';
import { TagDeleteComponent } from 'tag/tag-delete/tag-delete.component';


// alertify
declare let alertify: any;


@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
})


export class TagListComponent implements OnInit {
  // define display columns
  displayedColumns: string[] = [
    'id',
    'tag_name',
    'tag_type',
    'store_count',
    'status',
    'action',
  ];


  dataSource;

  unload:boolean = false;

  params = {
    per_page:6
  };

  imageUrl = environment.imageUrl;


  constructor(
    private authService: AuthService,
    private element: ElementRef,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getTableDataSource();
  }


  getTableDataSource( pageNum?: number ) {
    if (pageNum != null) {
      this.params.per_page += this.params.per_page;
    }
    this.authService.getTags({per_page: this.params.per_page}).subscribe((response) => {
      this.unload = response.content.total <= response.content.data.length ? true : false;
      this.dataSource = response.content.data;
      console.log(response.content.data);

      this.dataSource.forEach(val => {
        val.locales = val.locales.reduce((obj, item) => ({...obj, [item.locale]: item}) , []);
    });

      console.log('DATA SOURCE');
      console.log(this.dataSource);

   });
  }

  openDialog(tagElement): void {
    // console.log(tagElement);
    const dialogRef = this.dialog.open(TagDeleteComponent, {
      width: '35vw',
      data: { tagElement: tagElement , getTagsData: () => this.getTableDataSource() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }




  changeStatus( statusNumber, tagId){
    // this.statusChange = this.statusChange === true ? false : true;
    let status = statusNumber === 0 ? true : false;
    let data = { status: status };
    console.log(' CHANGE STATUS ');
    console.log(status);
    this.authService.changeStatus(data , {id: tagId}).subscribe(response => {
      alertify.success(' Status successfully changed ');
    });
  }



}
