import axios, { AxiosRequestConfig } from "axios";

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
    axiosInstance.defaults.withCredentials = true;
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

export class AppointmentService {
  insert(
    body: { doctor: string; date: string; time: string },
    headers: AxiosRequestConfig
  ) {
    return axiosInstance.post("/appointments/booking", body, headers);
  }

  getAllForAuthenticatedUser(
    params: {
      page: number;
      linesPerPage: number;
      direction: string;
      orderBy: string;
    },
    headers: AxiosRequestConfig
  ) {
    return axiosInstance.get("/appointments/my", {
      params,
      ...headers,
    });
  }
}

export class DoctorService {}
