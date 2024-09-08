import axios, { AxiosRequestConfig } from "axios";
import { UUID } from "crypto";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export function getHeaders(token: string | null): AxiosRequestConfig {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  return {};
}

export class MessageService {
  insert(body: {
    sender: string;
    email: string;
    phone: string;
    description: string;
  }) {
    return axiosInstance.post("/messages", body);
  }

  delete(token: string | null, id: string) {
    const headers = getHeaders(token);
    return axiosInstance.delete(`/messages/${id}`, headers);
  }

  getAll(
    token: string | null,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    const headers = getHeaders(token);
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

  current(token: string | null) {
    const headers = getHeaders(token);
    return axiosInstance.get("/auth/current", headers);
  }
}

export class AppointmentService {
  insert(
    body: { doctor: string; date: string; time: string },
    token: string | null
  ) {
    const headers = getHeaders(token);
    return axiosInstance.post("/appointments/booking", body, headers);
  }

  cancel(token: string | null, id: UUID) {
    const headers = getHeaders(token);
    return axiosInstance.patch(`/appointments/cancel/${id}`, null, headers);
  }

  finish(token: string | null) {
    const headers = getHeaders(token);
    return axiosInstance.patch("/appointments/finish", null, headers);
  }

  getAll(
    token: string | null,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    const headers = getHeaders(token);
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
    token: string | null,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    const headers = getHeaders(token);
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
  getByEmail(token: string | null, email: string) {
    const headers = getHeaders(token);
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
    token: string | null
  ) {
    const headers = getHeaders(token);
    return axiosInstance.post("/doctors/register", body, headers);
  }

  delete(token: string | null, email: string) {
    const headers = getHeaders(token);
    return axiosInstance.delete(`/doctors/${email}`, headers);
  }

  getAllBySpecialization(specialization: string, token: string | null) {
    const headers = getHeaders(token);
    return axiosInstance.get(`/doctors/list/${specialization}`, headers);
  }

  getAll(
    token: string | null,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    const headers = getHeaders(token);
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
    token: string | null,
    params: {
      page?: number;
      linesPerPage?: number;
      direction?: string;
      orderBy?: string;
    }
  ) {
    const headers = getHeaders(token);
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

  getByEmail(token: string | null, email: string) {
    const headers = getHeaders(token);
    return axiosInstance.get(`/patients/${email}`, headers);
  }
}
