import { Injectable } from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Router} from "@angular/router";
import {YoutubeVideo} from "../model/youtube-video";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor(private router: Router, private localStorageService: LocalStorageService) {
  }

  register(userData: any): boolean {
    const users = this.getUsers();

    console.log(users)

    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      return false;
    }

    userData.library = [];

    users.push(userData);
    this.localStorageService.setItem(this.usersKey, users);
    return true;
  }

  private getUsers(): any[] {
    return this.localStorageService.getItem(this.usersKey) || [];
  }

  saveCurrentUser(user: any): void {
    this.localStorageService.setItem(this.currentUserKey, user);

    let users = this.getUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
      users[index] = user;
    }
    this.localStorageService.setItem(this.usersKey, users);
  }


  login(credentials: any): boolean {
    const users = this.getUsers();

    const user = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      this.localStorageService.setItem(this.currentUserKey, user);
      return true;
    }

    return false;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getItem(this.currentUserKey);
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

}


