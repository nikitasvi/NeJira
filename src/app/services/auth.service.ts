import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  	providedIn: 'root'
})
export class AuthService {
	constructor(
		private readonly api: ApiService,
		private readonly router: Router
	) {}

	public register(username: string, email: string, password: string): Promise<any> {
		return this.api.post(`api/auth/register`, { username, email, password });
	}

	public login(username: string, password: string): Promise<any> {
		return this.api.post(`api/auth/login`, { username, password });
	}

	public static saveUser(user: User): void {
		localStorage.setItem('user', JSON.stringify(user));
	}

	public static getUser(): User {
		const user = localStorage.getItem('user');
		return user ?
			JSON.parse(user) :
			console.error('User not logged in');
	}

	public static saveToken(token: string): void {
		localStorage.setItem('token', token);
	}

	public static getToken(): string | null {
		return localStorage.getItem('token');
	}

	public static logout(): void {
		localStorage.removeItem('token');
	}

	public static isLoggedIn(): boolean {
		const token = AuthService.getToken();
		if (!token) {
			return false;
		}

		const decodedToken = this.decodeToken(token);
		const currentTime = Math.floor(Date.now() / 1000);

		// Check if token is expired
		return decodedToken.exp > currentTime;
	}

	private static decodeToken(token: string): any {
		const payload = token.split('.')[1];
		return JSON.parse(atob(payload));
	}
}
