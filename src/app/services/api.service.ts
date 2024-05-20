import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { baseUrl } from "../utils/app.config";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	public baseUrl: string = baseUrl;
	
	constructor(
		private readonly http: HttpClient,
		protected router: Router,
		protected zone: NgZone,
	) {}

	// Get
	public get<TResult = any>(endpoint: string): Promise<TResult | null> {
		const url = this.buildUrl(endpoint);
		const headers = this.getHeaders();

		const observable = this.http.get(url, {
		  	headers: headers,
		  	observe: 'response',
		}) as any as Observable<HttpResponse<TResult>>;

		return this.subscribe<TResult>(observable);
	}

	// Post
	public post(endpoint: string, data: unknown): Promise<any> {
		const url = this.buildUrl(endpoint);
		const content = JSON.stringify(data);
		const headers = this.getHeaders();

		const observable = this.http.post(url, content, {
			headers: headers,
			observe: 'response'
		});

		return this.subscribe(observable);
	  }

	// Put
	public put(endpoint: string, data: unknown): Promise<any> {
		const url = this.buildUrl(endpoint);
		const content = JSON.stringify(data);
		const headers = this.getHeaders();

		const observable = this.http.put(url, content, { 
			headers: headers, 
			observe: 'response' 
		});

		return this.subscribe(observable);
	}

	// Delete
	public delete(endpoint: string): Promise<any> {
		const url = this.buildUrl(endpoint);
		const headers = this.getHeaders();

		const observable = this.http.delete(url, {
		  headers: headers,
		  observe: 'response',
		});

		return this.subscribe(observable);
	}

	private buildUrl(endpoint: string): string {
		return `${this.baseUrl}/${endpoint}`;
	}

	protected getHeaders(): HttpHeaders {
		const isTokenAlive = AuthService.isLoggedIn();
		if (!isTokenAlive) {
			AuthService.logout();
		}

		const token = AuthService.getToken();
		const headers = new HttpHeaders({
		  	'content-type': 'application/json',
		  	Authorization: token ? `Bearer ${token}` : [],
		});
		return headers;
	}

	protected subscribe<TResult = any>(
		observable: Observable<HttpResponse<TResult>>
	): Promise<TResult | null> {
		const promise = new Promise<TResult | null>((resolve, reject) => {
		  observable.subscribe({
			next: (r: any) => {
				setTimeout(() => {
					this.zone.run(() => {
						resolve(r['body']);
					});
				});
			},
			error: (r: any) => {
			  if (r.status === 400) {
					resolve(r.error || null);
			  }
			  if (r.status === 401) {
				//AuthManager.logout();
				this.router.navigate(['/login']);	
				return;
			  }
			  resolve(null);
			},
		  });
		});
	
		return promise;
	  }
}