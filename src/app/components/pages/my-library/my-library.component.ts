import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {YoutubeVideo} from "../../../model/youtube-video";
import {MyLibraryService} from "../../../services/my-library.service";
import {NgForOf, NgIf} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-my-library',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './my-library.component.html',
  styleUrl: './my-library.component.css'
})
export class MyLibraryComponent implements OnInit, OnDestroy {
  library: YoutubeVideo[] = [];
  private librarySubscription!: Subscription;
  @Output() videoSelected = new EventEmitter<YoutubeVideo>();
  @Input() isVideoPlayerVisible: boolean = false;

  constructor(private libraryService: MyLibraryService) { }

  ngOnInit(): void {
    this.librarySubscription = this.libraryService.getLibraryObservable().subscribe((videos) => {
      this.library = videos;
    });
  }

  ngOnDestroy(): void {
    if (this.librarySubscription) {
      this.librarySubscription.unsubscribe();
    }
  }

  removeVideo(video: YoutubeVideo): void {
    this.libraryService.removeVideo(video);
  }

  playVideo(video: YoutubeVideo): void {
    console.log('Video selected:', video);
    this.videoSelected.emit(video);
  }
}
