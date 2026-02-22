import axios from "./axios";

// Ruta de nuestro backend
//const API = 'http://localhost:4000/api';

// Enviamos un usuario desde nuestro frontend, a la ruta register de nuestro backend mediante un post
// el parametro user, es el request body que enviamos desde el frontend
export const registerRequest = user =>
  axios.post(`/register`, user);

export const loginRequest = user =>
  axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify');