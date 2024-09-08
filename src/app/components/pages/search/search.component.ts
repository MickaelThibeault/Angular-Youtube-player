import { Component } from '@angular/core';
import {YoutubeService} from "../../../services/youtube.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {YoutubeVideo} from "../../../model/youtube-video";
import {MyLibraryService} from "../../../services/my-library.service";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  query: string = '';
  videos: YoutubeVideo[] = [];
  error: string | null = null;

  constructor(private youtubeService: YoutubeService, private libraryService: MyLibraryService) { }

  search() {
    this.youtubeService.searchVideos(this.query).subscribe({
      next: (response) => {
        this.videos = response.items;
        console.log(this.videos);
        this.error = null;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue.';
        console.error(err);
      }
    });
  }

  addToLibrary(video: YoutubeVideo) {
    this.libraryService.addVideo(video);
  }
}
