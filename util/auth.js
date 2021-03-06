/* eslint-disable prettier/prettier */
import axios from 'axios';

const API_KEY = 'AIzaSyBhUZgDfYcBrlxgVRfl9MW3EH4t4XZDioQ';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  console.log(response.data);
  return token;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}

export async function forgotPassword(email) {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' +
      API_KEY,
    {
      email: email,
      requestType: 'PASSWORD_RESET',
    },
  );

  const token = response.data.email;

  console.log(response.data);
  return token;
}
