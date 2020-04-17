import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  endpoint:string = 'http://localhost:3000/api';

  public importJobs() {
    return this.http.post(this.endpoint + '/jobs/sync', {});
  }
  
  public fetchJobs(queryParams) {
    console.log('quuery', typeof(queryParams.location))
    const httpParams = new HttpParams().set('location', queryParams.location).set('title', queryParams.title) ;
    // if (queryParams.localhost)
    //   httpParams.set('location', queryParams.location);
    // if(queryParams.title) {
    //   httpParams.set('title', queryParams.title) 
    // }
    const options = {
      params: httpParams
    }
    console.log('options', options)
    return this.http.get(this.endpoint + '/jobs', options);
  }
}
