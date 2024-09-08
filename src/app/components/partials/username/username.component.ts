import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [],
  templateUrl: './username.component.html',
  styleUrl: './username.component.css'
})
export class UsernameComponent implements OnInit {

  username: string = '';
  @Output() toggleView = new EventEmitter<boolean>();
  isVideoPlayerVisible: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.username = this.localStorageService.getItem('currentUser')?.username;
  }

  toggle(): void {
    this.isVideoPlayerVisible = !this.isVideoPlayerVisible;
    this.toggleView.emit(this.isVideoPlayerVisible);
  }


}
