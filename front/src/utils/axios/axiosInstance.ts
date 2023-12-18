// config/axiosInstance.js

import { AppState } from '@/state/appSlice';
import { RootState, store } from '@/state/store';
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND}`, // Substitua pela URL da sua API
});

// Interceptor de Request
axiosInstance.interceptors.request.use(
	(config) => {
		const state: RootState = store.getState();
		const { accessToken }: AppState = state.app;

		if (accessToken) {
			config.headers.authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		// Trate erros de solicitação
		return Promise.reject(error);
	}
);

// Interceptor de Response
axiosInstance.interceptors.response.use(
	(response) => {

		return response;
	},
	(error) => {
		// Trate erros de resposta
		return Promise.reject(error);
	}
);