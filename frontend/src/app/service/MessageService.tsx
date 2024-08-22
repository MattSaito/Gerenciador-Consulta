import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export class MessageService {
  insert(body: { sender: string; email: string; phone: string; desc: string }) {
    return axiosInstance.post("/messages", body);
  }
}
