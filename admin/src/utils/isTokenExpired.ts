import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token: string) => {
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp) {
            const expirationTime = new Date(decoded.exp * 1000);
            const currentTime = new Date();
            return expirationTime < currentTime;
        }
    }
    return true;
};

export default isTokenExpired;
