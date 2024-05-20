import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { User } from "../models/user.model";

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private readonly apiService: ApiService) { }

	public getUsers() {
		return this.apiService.get<Array<User>>('api/users');
	}
}