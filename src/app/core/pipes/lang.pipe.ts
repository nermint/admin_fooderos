import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lang'
})
export class LangPipe implements PipeTransform {

 

  transform(array:any, lang?: string): any {

 

    // let localesContainer=array;
    // let result;
    

    // result = localesContainer.reduce(function (r, a) {
    //   r[a.locale] = r[a.locale] || [];
    //   r[a.locale].push(a);
    //   return r;
    // }, Object.create(null));

    //console.log('RESULT IN THE PIPE');
    //console.log(result.az[0].title);

    
    

    // return result.az[0].title;
    
    return array.filter((elem) => elem.locale === lang)[0].title;

  }

}
