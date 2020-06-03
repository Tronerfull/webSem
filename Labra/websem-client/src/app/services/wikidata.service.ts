import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    Accept:  'application/sparql-results+json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class WikidataService {
  private baseUrl = 'https://query.wikidata.org/sparql?query=';

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    return this.http.get(this.baseUrl + query, httpOptions);
  }

  postQuery(query: string) {
    return this.http.post(this.baseUrl, query, httpOptions);
  }
}
