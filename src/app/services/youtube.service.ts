import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {YoutubeSearchResponse} from "../model/youtube-search-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = environment.API_KEY;
  private baseUrl = environment.URL_BASE;


  constructor(private http: HttpClient) { }

  searchVideos(query: string): Observable<YoutubeSearchResponse> {
    const url = `${this.baseUrl}/search?part=snippet&q=${encodeURIComponent(query)}&key=${this.apiKey}&type=video`;
    return this.http.get<YoutubeSearchResponse>(url);
  }

}
