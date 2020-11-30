import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router,) {

  }

  url = environment.httpRequestUrl;

  login(data): Observable<any>{
    return this.http.post(this.url + 'send/otp', data);
  }

  verify(data): Observable<any>{
    return this.http.post(this.url + 'login', data);
  }

  logout(): Observable<any>{
    //  let headers = new HttpHeaders().set('ApplicationKey',environment.appKey).set('Authorization', localStorage.getItem('Token'));
     return this.http.post(this.url + 'logout',{});
  }

  getTags(params: any = { }): Observable<any>{
    // let headers = new HttpHeaders().set('ApplicationKey',environment.appKey).set('Authorization', localStorage.getItem('Token'));
    return this.http.get(this.url + 'admin/tag', { params :params});
  }

  deleteTag(params: any = { }): Observable<any>{
    return this.http.delete(this.url + `admin/tag/${params.id}`, {params:params});
  }

  getTagTypes(): Observable<any>{
    return this.http.get(this.url + 'admin/tag/types')
  }

  createTag(data): Observable<any>{
    return this.http.post(this.url + 'admin/tag', data);
  }

  getTagById(params: { id: any }): Observable<any>{
    return this.http.get(this.url + `admin/tag/show/${params.id}`, {params:params});
  }

  updateTag(data, params: any = { } ): Observable<any>{
    return this.http.put(this.url + `admin/tag/${params.id}`, data);
  }

  changeStatus(data, params: any = { }): Observable<any>{
    return this.http.put(this.url + `admin/tag/status/${params.id}`, data);
  }




}
