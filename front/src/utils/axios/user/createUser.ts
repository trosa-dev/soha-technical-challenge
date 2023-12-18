// Importing the Axios instance for making HTTP requests
import { axiosInstance } from "../axiosInstance";

// Interface representing the parameters expected for creating a user
interface CreateUserParam {
	email: string;
	password: string;
}

// Interface representing the response received after a successful user creation request
interface CreateUserResponse {
	email: string;
	access_token: string;
}

// Async function for creating a user
export async function createUser(params: CreateUserParam) {
	try {
		// Making a POST request to the 'user' endpoint using the Axios instance
		const promise = await axiosInstance.post<CreateUserResponse>(`user`, params);

		// Returning the promise, which will resolve to the response data
		return promise;
	} catch (error) {
		throw error;
	}
};
