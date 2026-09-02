import axios from "axios";
const API_BASE_URL = "http://13.233.160.141:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getStudents = () => api.get("/students");
export const createStudent = (data) => api.post("/students", data);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;
