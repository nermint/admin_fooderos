import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private http: HttpClient
  ) { }

  url = environment.httpRequestUrl;

 
}
