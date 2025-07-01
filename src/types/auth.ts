export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	profilePhoto?: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface User extends RegisterRequest {
	id: string;
	createdAt: Date;
}