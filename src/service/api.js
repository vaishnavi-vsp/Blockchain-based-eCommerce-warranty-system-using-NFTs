import axios from 'axios';

const url = 'http://localhost:8000';

export const authenticateLogin = async (user) => {
    try {
        const saveuser =  await axios.post(`${url}/login`, user);
        localStorage.setItem('user', JSON.stringify(saveuser.data.user));
        console.log("Saving user",saveuser.data.user)
        return saveuser;
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user)
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
