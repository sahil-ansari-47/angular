import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<any>;

  user$;

  constructor() {
    const storedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.user$ = this.userSubject.asObservable();
  }

  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  get user() {
    return this.userSubject.value;
  }
}
