import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export class MessageService {
  insert(body: {
    sender: string;
    email: string;
    phone: string;
    description: string;
  }) {
    return axiosInstance.post("/messages", body);
  }
}

export class AuthService {
  login(body: { login: string; password: string }) {
    return axiosInstance.post("/auth/login", body);
  }

  register(body: {
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
  }) {
    return axiosInstance.post("/auth/register", body);
  }
}
