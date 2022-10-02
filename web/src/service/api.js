import axios from 'axios';
import setAuthToken from './setAuthToken';

const url = 'http://localhost:8000';

export const authenticateLogin = async (user) => {
    try {
        const saveuser =  await axios.post(`${url}/login`, user);
        console.log("This is the data while logging in")
        console.log(saveuser)
        setAuthToken(saveuser.data.token)
        localStorage.setItem('isAuthenticated',true)
        localStorage.setItem('user', JSON.stringify(saveuser.data.user));
        localStorage.setItem('token',saveuser.data.token)
        console.log("Saving user",saveuser.data.user)
        return saveuser;
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {

        const saveuser =  await axios.post(`${url}/signup`, user)
        localStorage.setItem('user', JSON.stringify(saveuser.data.user));
        return saveuser;

    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`${url}/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}
