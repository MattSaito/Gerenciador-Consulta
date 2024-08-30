import axios, { AxiosRequestConfig } from "axios";
import { UUID } from "crypto";

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

  delete(headers: AxiosRequestConfig, id: string) {
    return axiosInstance.delete(`/messages/${id}`, headers);
  }

  getAll(
    headers: AxiosRequestConfig,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    return axiosInstance.get("/messages", {
      ...headers,
      params: {
        page: params.page || 0,
        linesPerPage: params.linesPerPage || 4,
        direction: params.direction || "ASC",
        orderBy: params.orderBy || "sender",
      },
    });
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

  current(headers: AxiosRequestConfig) {
    return axiosInstance.get("/auth/current", headers);
  }
}

export class AppointmentService {
  insert(
    body: { doctor: string; date: string; time: string },
    headers: AxiosRequestConfig
  ) {
    return axiosInstance.post("/appointments/booking", body, headers);
  }

  cancel(headers: AxiosRequestConfig, id: UUID) {
    return axiosInstance.patch(`/appointments/cancel/${id}`, null, headers);
  }

  finish(headers: AxiosRequestConfig) {
    return axiosInstance.patch("/appointments/finish", null, headers);
  }

  getAll(
    headers: AxiosRequestConfig,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    return axiosInstance.get("/appointments", {
      ...headers,
      params: {
        page: params.page || 0,
        linesPerPage: params.linesPerPage || 4,
        direction: params.direction || "ASC",
        orderBy: params.orderBy || "date",
      },
    });
  }

  getAllForAuthenticatedUser(
    headers: AxiosRequestConfig,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    return axiosInstance.get("/appointments/my", {
      ...headers,
      params: {
        page: params.page || 0,
        linesPerPage: params.linesPerPage || 4,
        direction: params.direction || "ASC",
        orderBy: params.orderBy || "date",
      },
    });
  }
}

export class DoctorService {
  getByEmail(headers: AxiosRequestConfig, email: string) {
    return axiosInstance.get(`/doctors/${email}`, headers);
  }

  create(
    body: {
      username: string;
      email: string;
      specialization: string;
      docFees: number;
      CRM: string;
      password: string;
    },
    headers: AxiosRequestConfig
  ) {
    return axiosInstance.post("/doctors/register", body, headers);
  }

  delete(headers: AxiosRequestConfig, email: string) {
    return axiosInstance.delete(`/doctors/${email}`, headers);
  }

  getAllBySpecialization(specialization: string, headers: AxiosRequestConfig) {
    return axiosInstance.get(`/doctors/list/${specialization}`, {
      ...headers,
    });
  }

  getAll(
    headers: AxiosRequestConfig,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    return axiosInstance.get("/doctors", {
      ...headers,
      params: {
        page: params.page || 0,
        linesPerPage: params.linesPerPage || 4,
        direction: params.direction || "ASC",
        orderBy: params.orderBy || "username",
      },
    });
  }
}

export class PatientService {
  getAll(
    headers: AxiosRequestConfig,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    return axiosInstance.get("/patients", {
      ...headers,
      params: {
        page: params.page || 0,
        linesPerPage: params.linesPerPage || 4,
        direction: params.direction || "ASC",
        orderBy: params.orderBy || "firstName",
      },
    });
  }
  getByEmail(headers: AxiosRequestConfig, email: string) {
    return axiosInstance.get(`/patients/${email}`, headers);
  }
}
