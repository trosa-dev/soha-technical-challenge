import { login } from '@/utils/axios/auth/login';
import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// Defining the structure of the response data
type ResponseData = {
	message: string;
};

// Exporting an asynchronous function to handle Next.js API requests
export default async function loginBFF(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		// Checking if the HTTP method is POST
		if (req.method === 'POST') {

			// Extracting email and password from the request body
			const { email, password } = req.body;

			// Calling the login function with the provided email and password
			const user = await login({ email: email, password: password });

			// Sending the response with the status and data from the login result
			res.status(user.status).json(user.data as any);
		}
	} catch (error) {
		// Checking if the error is an Axios error
		if (isAxiosError(error)) {

			// Checking if the error has a response status
			if (error.response?.status) {

				// Sending the response with the status and data from the error response
				res.status(error?.response.status).json(error?.response.data as any);
			}
		}

		// Sending a generic error response if the error is not handled above
		res.status(400).json({ message: "Something went wrong" });
	}
}
