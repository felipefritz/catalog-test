import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot_password`;

// El servidor debería devolver AuthModel
export function login(email: string, password: string) {
  return fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      // 'Accept-Encoding': 'gzip, deflate, br',
      // Añade otros encabezados si es necesario
    },
    body: JSON.stringify({ email, password }),
  })
  .then(async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud');
    }
    return response.json();
  })
  .then((data) => {
    const { access_token, user } = data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user));
    return data;
  })
  .catch((error) => {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  });
}


// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(user: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    user,
  });
}

export function getUserByToken() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}
