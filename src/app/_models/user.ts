export interface UserResponse {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	token: string;
}

export class User {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	token: string;
	password: string;

	constructor(response: UserResponse) {
		this.id = response.id;
		this.username = response.username;
		this.firstname = response.firstname;
		this.lastname = response.lastname;
		this.token = response.token;
	}
}

export class LoginResponse {
	loading: boolean;
	data: {
		login: string;
	};
}
