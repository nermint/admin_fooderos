import {Component, Input, OnInit} from '@angular/core';
import {ITag} from '../models/tag';
import {environment} from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-drag-and-drop-file',
  templateUrl: './drag-and-drop-file.component.html',
  styleUrls: ['./drag-and-drop-file.component.css']
})
export class DragAndDropFileComponent implements OnInit {

  constructor() { }

  private _tag = new BehaviorSubject<any>([]);

  @Input()
  set tag(value) {
    // set the latest value for _data BehaviorSubject
    this._tag.next(value);
  }

  get tag() {
    // get the latest value from _data BehaviorSubject
    return this._tag.getValue();
  }

  files: File[] = [];

  fileName: string;
  file;
  prevFile: [];
  imgSrc;
  imageUrl = environment.imageUrl;

  // @Input() tag: ITag;
  tagData: ITag;

  ngOnInit(): void {
    // console.log(this.tag);

    // if ( this.tag ){
    //   this.imgSrc = this.imageUrl + this.tag.media?.path + '/' + this.tag.media?.name;
    // }
    this._tag
      .subscribe(x => {
        // console.log(this.tag);
        if (this.tag){
          this.imgSrc = this.imageUrl + this.tag.media?.path + '/' + this.tag.media?.name;
        }
      });
  }



  onSelect(event) {
    const comp = this;
    const img = <File> event.addedFiles[0];
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(img);
    });

    promise.then( img => {
      comp.imgSrc = img;
      // console.log(img);
      this.file = img;
      // if you want to do anything with img you can do it here
    });

  }

  onRemove(event){
      // console.log(event);
      //
      // this.files.splice(this.files.indexOf(event), 1);
    this.imgSrc="";
  }

}
