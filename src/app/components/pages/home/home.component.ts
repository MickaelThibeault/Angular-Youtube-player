import {Component, OnInit} from '@angular/core';
import {UsernameComponent} from "../../partials/username/username.component";
import {SearchComponent} from "../search/search.component";
import {MyLibraryComponent} from "../my-library/my-library.component";
import {MyLibraryService} from "../../../services/my-library.service";
import {VideoPlayerComponent} from "../video-player/video-player.component";
import {NgIf} from "@angular/common";
import {YoutubeVideo} from "../../../model/youtube-video";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UsernameComponent,
    SearchComponent,
    MyLibraryComponent,
    VideoPlayerComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isVideoPlayerVisible: boolean = false;
  selectedVideo!: YoutubeVideo;

  constructor(private libraryService: MyLibraryService) {
  }

  ngOnInit(): void {
    this.libraryService.loadLibrary();
  }

  onToggleView(isVisible: boolean): void {
    this.isVideoPlayerVisible = isVisible;
  }

  onVideoSelected(video: YoutubeVideo): void {
    console.log('Video received in HomeComponent:', video);
    this.selectedVideo = video;
    this.isVideoPlayerVisible = true;
  }
}
