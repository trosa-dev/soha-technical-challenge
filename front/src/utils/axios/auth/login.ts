// Importing the Axios instance for making HTTP requests
import { axiosInstance } from "../axiosInstance";

// Interface representing the parameters expected for creating a user (login)
interface CreateUserParam {
	email: string;
	password: string;
}

// Interface representing the response received after a successful login request
interface CreateUserResponse {
	id: number;
	email: string;
	access_token: string;
}

// Async function for making a login request
export async function login(params: CreateUserParam) {
	try {
		// Making a POST request to the 'auth/login' endpoint using the Axios instance
		const promise = await axiosInstance.post<CreateUserResponse>(`auth/login`, params);

		// Returning the promise, which will resolve to the response data
		return promise;
	} catch (error) {
		throw error;
	}
};
