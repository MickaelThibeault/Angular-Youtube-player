import {Component, Input, SimpleChanges} from '@angular/core';
import { YoutubeVideo } from '../../../model/youtube-video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-video-player',
  standalone: true,
  templateUrl: './video-player.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  @Input() video!: YoutubeVideo;
  defaultVideoId: string = 'dQw4w9WgXcQ';
  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  getVideoUrl(): SafeResourceUrl {
    console.log(this.video);
    const videoId = this.video && this.video.id && this.video.id.videoId ? this.video.id.videoId : this.defaultVideoId;
    const unsafeUrl = `https://www.youtube.com/embed/${videoId}`;

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    return this.safeUrl;
  }
}
