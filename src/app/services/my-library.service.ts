import { Injectable } from '@angular/core';
import {YoutubeVideo} from "../model/youtube-video";
import {LocalStorageService} from "./local-storage.service";
import {AuthService} from "./auth.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyLibraryService {
  private library: BehaviorSubject<YoutubeVideo[]> = new BehaviorSubject<YoutubeVideo[]>([]);


  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {
    this.loadLibrary()
  }

  getLibraryObservable(): Observable<YoutubeVideo[]> {
    return this.library.asObservable();
  }

  addVideo(video: YoutubeVideo) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      currentUser.library.push(video);
      this.authService.saveCurrentUser(currentUser);
      this.library.next(currentUser.library); // Notify subscribers
      console.log('Vidéo ajoutée à la bibliothèque :', video);
    } else {
      console.error('Aucun utilisateur connecté pour ajouter la vidéo à la bibliothèque.');
    }
  }

  getLibrary() {
    const currentUser = this.authService.getCurrentUser();
    console.log(currentUser)
    if (currentUser && currentUser.library) {
      return currentUser.library;
    }
    return [];
  }

  loadLibrary() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.library) {
      try {
        this.library.next(currentUser.library);
      } catch (error) {
        console.error('Erreur lors du chargement de la bibliothèque de l\'utilisateur:', error);
        this.library.next([]);
      }
    } else {
      this.library.next([]);
    }
  }

  private saveLibrary() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      currentUser.library = this.library;
      this.authService.saveCurrentUser(currentUser);
    } else {
      console.error('Impossible de sauvegarder la bibliothèque : aucun utilisateur connecté.');
    }
  }

  removeVideo(video: YoutubeVideo) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      currentUser.library = currentUser.library.filter((v: { id: { videoId: string; }; }) => v.id.videoId !== video.id.videoId);
      this.authService.saveCurrentUser(currentUser);
      this.library.next(currentUser.library);
      console.log('Vidéo supprimée de la bibliothèque :', video);
    }
  }
}
