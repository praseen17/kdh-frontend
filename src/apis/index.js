import axios from "axios";
const API = axios.create({
  baseURL: `http://localhost:5500`,
  // withCredentials: true,
});

export const bookAppointment = async (form) => await API.post("/api/appointments" , form) ;