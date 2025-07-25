import axios from "axios";
const API = axios.create({
  baseURL: `https://kdh-backend.onrender.com`,
  // withCredentials: true,
});

export const bookAppointment = async (form) => await API.post("/api/appointments" , form) ;
