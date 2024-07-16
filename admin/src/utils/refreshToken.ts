import axios from './axios';
import isTokenExpired from './isTokenExpired';

const refreshTokenFunc = async (token: string) => {
    try {
        if (isTokenExpired(token)) {
            const { data } = await axios.post('/auths/refresh');
            localStorage.setItem('token', data.data);
            return data.data;
        } else {
            return token;
        }
    } catch (err) {
        console.log(err);
    }
};

export default refreshTokenFunc;
