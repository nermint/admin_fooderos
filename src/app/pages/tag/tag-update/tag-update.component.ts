import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  Validators, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Locale, Tagtype, ITag } from 'src/app/shared/models/tag';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';


// alertify
declare let alertify: any;

@Component({
  selector: 'app-tag-update',
  templateUrl: './tag-update.component.html',
  styleUrls: ['./tag-update.component.css']
})
export class TagUpdateComponent implements OnInit {

  constructor( private authService: AuthService,
               private formBuilder: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private _location: Location
   ) { }


  get locales(){
    return this.updateFormGroup.get('locales') as FormArray;
  }


  get tag_type_id(){
    return this.updateFormGroup.get('tag_type_id');
  }

  updateFormGroup: FormGroup;
  tagTypes: Tagtype;
  languages;
  media;
  data = {};
  tagId;
  tag: ITag;

    ngOnInit(): void {
      this.languages = localStorage.getItem('languages').split(',');
      this.initForm();
      this.getTagTypes();
      console.log('ID');
      this.tagId = this.activatedRoute.snapshot.params.id;
     // console.log(this.tagId);
      console.log(' Tag by id');
      if ( this.tagId ){
        this.getTagById();
      }
    }

  initForm(){
    this.updateFormGroup = this.formBuilder.group({
      // file: [] = ['', Validators.required],
      tag_type_id: ['', Validators.required],
      locales: this.formBuilder.array([])
    });
    for (const language of this.languages) {
      this.locales.push(this.createLocaleItems(language));
    }
  }


  createLocaleItems(language): FormGroup {
      return this.formBuilder.group({
        title: ['', Validators.required],
        locale: [language]
      });
  }


  getLocales() {
    const locales: Locale[] = [];

    for ( let i = 0; i < this.locales.controls.length; i++){
      locales.push({
        title: this.locales.controls[i].value.title,
        locale: this.locales.controls[i].value.locale });
    }

    console.log('THIS LOCALES');
    console.log(locales);


    return locales;

  }



  getTagTypes(){
    this.authService.getTagTypes().subscribe( response => {
      this.tagTypes = response.content;
      // console.log(response['content']);
    });
  }


  getEnteredData(){
    const tag_type_id = this.tag_type_id.value;
    const locales = this.getLocales();
    return {
      tag_type_id,
      store_type_id: 1,
      locales,
      media: this.media
    };
  }


  updateTag(file){
      console.log('THIS FILE');
      // console.log(file);
      const data = this.getEnteredData();
      if (file) {
        data.media = file;
      }else{
        delete data.media;
      }
      console.log('DATA');
      console.log(data);
      if (this.updateFormGroup.valid ){
          if ( this.tagId ){
            this.authService.updateTag(data, {id: this.tagId}).subscribe(response => {
              this.router.navigate(['/dashboard/tag']);
              alertify.success(' Tag successfully updated ');
            });
          }
          else {
            this.authService.createTag(data).subscribe(response => {
              this.router.navigate(['/dashboard/tag']);
              alertify.success(' Tag successfully created ');
            });
          }
      }
  }




  getTagById(){
      this.authService.getTagById({id : this.tagId} ).subscribe( response => {
        console.log(response.content);
        this.tag = response.content;
        this.setValueToFormElement();
      });
  }

  setValueToFormElement(){
    this.updateFormGroup.controls.tag_type_id.setValue(this.tag.tag_type_id);
    for (let i = 0; i < this.locales.controls.length; i++) {
      this.locales.controls[i]['controls'].title?.setValue(this.tag.locales[i]?.title);
    }
  }


  // go back link
  backPage(){
    this._location.back();
  }





}
