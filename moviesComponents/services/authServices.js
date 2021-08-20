const apiKey = 'AIzaSyBUj7xEfbaMs0QV0nbpv0rRDutrB90JhmU';
const databaseUrl = `https://movies-3f0d2-default-rtdb.firebaseio.com`;
const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

import { request } from "./requestServices.js";

export const register = async (email, password) => {
    let res = await request(registerUrl, 'POST', {
        email,
        password,
    });

    localStorage.setItem('auth', JSON.stringify(res));

    return res;
};

